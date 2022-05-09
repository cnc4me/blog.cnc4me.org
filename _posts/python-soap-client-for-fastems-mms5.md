---
title: "Python SOAP Client for Fastems MMS5"
excerpt: ""
date: "2022-05-09T10:00:00.0Z"
author: "@kevin"
coverImage: "/assets/blog/python-soap-client/cover.jpg"
ogImage:
  url: "/assets/blog/python-soap-client/cover.jpg"
tags:
 - cnc
 - python
 - automation
---
## Background

Here is a little background before the technical. I used to program and run a horizontal machining cell constiting of two identical Matsuura H+405s and a crane operated, 24 pallet storage container. This container system is designed by FASTEMS and it is an add-on type, third party system. Besides physically loading the machine, the system digitally interfaces with the machine, only really to transfer programs and command which one to run. The scheduling of jobs and pallets is done by the system, which works great, but someone has to input the jobs and quantities and dates. This was supposed to be done automatically by the ERP software, but it just... never happened.

## The Problem

We as the operators, would need to take the routers, and input the jobs ourselves into the system. It's not that big of a deal, but that means there is a disconnect. The FASTEMS cell can have stale or innacurate forecasts. It needs to know about all routed jobs. The interface is web-based but stuck on a pedestal in front of the container. Operating the touch interface as an often dirty handed machinisht, it was not ideal. I dreaded using it. The keyboard was not positioned well for typing while standing, getting a track-ball helped with navigation,  but still, __it was a pain__.

## There Has to be a Better Way

Since I know that the interface is a web interface, that means there is a backend it communicates with. Let's open the console and investigate some of the requests being made. I found out that the interface was making SOAP requests to the backend and therefore, maybe I could replicate those requests. Here is a small snippet of one of the requests. (there is 3600+ lines of XML)

[![Image of XML document of SOAP Request](/assets/blog/python-soap-client/xhr1.jpg)](/assets/blog/python-soap-client/xhr1.jpg)

The main take away here is that if the MMS5 interface can communicate with http requests, then I can too. I have never attempted something like this before, but I know it's possible, so, let's get to work.

## Deciding on an Implementation

I will say up front, that I am not "skilled" in python, but I know enough to utilize the language to do what I want. My initial research on packages that might help me create a SOAP client led me to Java, C#, .NET, but no language I knew very well. I know python has a huge package library, so let's look there. [The first result was Zeep](https://docs.python-zeep.org/en/master/), which looked really promising. It could do [authentication](https://docs.python-zeep.org/en/master/transport.html#http-authentication) which I needed. I would be able to create a method for applying the headers relevant to pretend to be the MMS5 dashboard.

```python
def egress(self, envelope, http_headers, operation, binding_options):
    """Tap outgoing request"""
    ignore_at = datetime.now().strftime('%m-%d-%Y %H:%M:%S %p')

    fastems_headers = {
        'Accept': '*/*',
        # 'SOAPAction': operation.soapaction,
        'Referer': 'http://%s/MMS5/DataManager.xap?ignore=%s' % (config.FASTEMS_HOSTNAME, ignore_at),
        'Accept-Language': 'en-US',
        'Accept-Encoding': 'gzip, deflate',
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; McAfee; InfoPath.2)',
        'Host': config.FASTEMS_HOSTNAME,
        'DNT': '1',
        'Connection': 'Keep-Alive',
        'Cache-Control': 'no-cache'
    }
```

From this point I was able to make basic requests to the backend! I was using small scripts to make one off requests, with it evolving as I used it. After creating a class to house the custom client...

```python
def build_client(service) -> (Client, HistoryPlugin):
  '''Create a new Zeep client with history based on a service name'''
  history = HistoryPlugin()

  session = Session()
  session.auth = HTTPBasicAuth(config.DATA_MANAGER_USER, config.DATA_MANAGER_PASS)

  transport = Transport(cache=SqliteCache(), session=session)
  wsd_uri = 'http://%s/MMS5/Services/%s.svc?wsdl' % (config.FASTEMS_HOSTNAME, service)

  plugins = [FastemsHeadersPlugin(), history]

  return Client(wsd_uri, transport=transport, plugins=plugins), history
```

Then we add a method to request the `WSDL` of the given service endpoint, parse the output, and generate some method definitions for a service class I want to make.

```python
def generate_methods(service):
  methods = []

  print('Building %s Zeep Client' % service)
  client, history = build_client(service)

  for service in client.wsdl.services.values():
    for port in service.ports.values():
      operations = sorted(
        port.binding._operations.values(),
        key=operator.attrgetter('name'))

    for operation in operations:
      print(operation.__dict__)
      m = re.match(r'([a-zA-Z]+)\((.+)?\)', str(operation))

      if m:
        param_def = ''
        params = ''

        if m.group(2):
          param_def = m.group(2).split(', ')
          params = ', '.join([p.split(': ')[0] for p in param_def])

        methods.append({
          'method_name': m.group(1),
          'params': params,
          'param_def': param_def
        })
  return methods
```

Now that we have all the endpoint and arguments, we can create classes to map onto each one, and provide me with a rich collection of API tethered classes with corresponding methods. So, lets use some templates, and write it all out to our project for comsumption.

```python
def generate_class_files():
  class_template_file = './py_templates/class.tmpl'
  method_template_file = './py_templates/method.tmpl'

  for service in __all__:
    service_class_file = './%s.py' % service
    methods = generate_methods(service)

    print('Creating %s' % service_class_file)
    with open(class_template_file, 'r') as class_template, \
            open(method_template_file, 'r') as method_template, \
            open(service_class_file, 'w') as new_class:

      method_str = method_template.read()

      new_class.write(class_template.read().format(service_name=service))
      new_class.write('\n')

      for method in methods:
        print('[%s] Adding %s()' % (service, method['method_name']))
        new_class.write(method_str.format(**method))

      new_class.write('\n')

    print('Done!\n')
```

Running this script produced a set of [18 class files](https://github.com/cnc4me/python-soap-client/tree/main/fastems/services) with fully defined endpoint, all similiar looking to the following. This was a huge win for me!

```python
from fastems import services

class OrderService(services.FastemsService):
  def __init__(self):
    super().__init__('OrderService')

  def BookScrapParts(self, requestor, scrapRequest):
    '''['requestor: ns2:RequestorDto', 'scrapRequest: ns3:BookScrapPartRequestDto']'''
    return self._client.service.BookScrapParts(requestor, scrapRequest)

  def CreateOrder(self, requestor, request):
    '''['requestor: ns2:RequestorDto', 'request: ns3:CreateOrderRequestDto']'''
    return self._client.service.CreateOrder(requestor, request)

  def DeleteCompletedOrders(self, requestor):
    '''['requestor: ns2:RequestorDto']'''
    return self._client.service.DeleteCompletedOrders(requestor)

  def DeleteOrder(self, requestor, orderId):
    '''['requestor: ns2:RequestorDto', 'orderId: ns3:OrderIdentityDto']'''
    return self._client.service.DeleteOrder(requestor, orderId)

  def GetOrders(self, ids):
    '''['ids: ns7:ArrayOfguid']'''
    return self._client.service.GetOrders(ids)

  def GetOrdersForOperation(self, operationId):
    '''['operationId: ns4:guid']'''
    return self._client.service.GetOrdersForOperation(operationId)

  def GetSettings(self):
    ''''''
    return self._client.service.GetSettings()

  def SaveSettings(self, requestor, settings):
    '''['requestor: ns2:RequestorDto', 'settings: ns3:OrderSettingsDto']'''
    return self._client.service.SaveSettings(requestor, settings)

  def UpdateOrder(self, requestor, request):
    '''['requestor: ns2:RequestorDto', 'request: ns3:UpdateOrderRequestDto']'''
    return self._client.service.UpdateOrder(requestor, request)
```

## Conclusion

I am very happy with how the code works and how all my service classes are generated for me. Automation is key so we can generate the building blocks and free up our time to build bigger and better things. The repository is [available here](https://github.com/cnc4me/python-soap-client) if you want to look through the source.
`
 - - -

The following video is me running [this script](https://github.com/cnc4me/python-soap-client/blob/main/create-orders-from-schedule.py) against the FASTEMS backend as a proof of concept video for management.

<video controls width="100%">
  <source src="/assets/blog/python-soap-client/demo.m4v" />
</video>
