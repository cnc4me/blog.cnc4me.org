---
title: "Matsuura Cell Manager Excel Automation"
excerpt: "Setting up a CNC machine requires reading a setupbook or program notes to get a list of tools required to run a program. To setup a job, is to first see if the program has a tool list. If so, great, if not, the Cell Manager can read a program and extract a `Onnnn_tools.csv` file. This is what the operators would print, and bring to the machine and compare against the currently loaded tools."
date: "2022-04-29T13:00:00.0Z"
author:
  name: Kevin Hill
  picture: "/assets/blog/kh.jpg"
coverImage: "/assets/blog/excel-automation/cover.jpg"
ogImage:
  url: "/assets/blog/excel-automation/cover.jpg"
tags:
 - vba
 - excel
 - scripting
---
## The Problem

Setting up a CNC machine requires reading a setupbook or program notes to get a list of tools required to run a program. To setup a job, is to first see if the program has a tool list. If so, great, if not, the Cell Manager can read a program and extract a `Onnnn_tools.csv` file. This is what the operators would print, and bring to the machine and compare against the currently loaded tools.

When I encounter this sort of repetitive task I, can't help but think about how to make it more efficient...

My idea is to use the Cell Manager (CM) to do the work for us. We have one piece, the program tool list, so now we need a machine tool list. I happen to know, that the CM can export a list of loaded tools from the machine. This is great! So first we generate the machine tool lists.

[![Screenshot of Matsuura Cell Manager exporting steps](/assets/blog/excel-automation/step1.jpg)](/assets/blog/excel-automation/step1.jpg)

Now we have to save this file to disk, so, on the C root is fine. This process needs to be repeated for both of my machines, to get the two machine tool lists I need.

[![Screenshot of Matsuura Cell Manager exporting steps](/assets/blog/excel-automation/step2.jpg)](/assets/blog/excel-automation/step2.jpg)

With our two `csv` files, we can definitely automate the comparison of these. I am very limited to my set of tools because of these two facts:

 1. The Cell Manager runs Windows XP with 2GB of ram.
 2. Per management, I am not allowed to install anything.

So my ideas started with a batch script since I know that is available on all windows. I did check for powershell first, but no luck. It seemed like doing csv/text processing in `cmd.exe` would be a chore so I quickly moved on. I found out that you can automate Excel with macros, and also, Visual Basic!! This is perfect, if we can just use Excel, the tool we already, then we are gold. I've never wrote VisualBasic but I love to learn, so lets go.

After a few hours of trial and error, I learned enough to create the following script, which automates the comparison of the two csv files. Lucky for me there was already a great example on Microsoft's website that I copied.  

## The Script

```vb
'======================================================
' Script: tool_compare.vbs
' Author: Kevin Hill
' Created: 5/2/22
' Version: 3
'
' Description:
'   This script can compare the exported contents
'   of a machines' tool list against to the extracted
'   tool list of a program.
'
' Usage:
'  Drag and drop a "Onnnn_tool.csv" extraction file
'  onto this script to run the comparison.
'
'======================================================
strToolListMaster = "C:\Share\TOOL LIST.xls"
strMasterToolBookSheetName = "TOOL LIST"

strToolListM1 = "C:\ToolData_MC1.csv"
strToolListM2 = "C:\ToolData_MC2.csv"

strNotFoundValue = "N/A"
intNotFoundColorIndex = 3

Function Main()
  StrPath = ""

  'Gather everything on the command line into a string
  For Each s In Wscript.Arguments
    StrPath = StrPath & s
  Next

  CompareSheets(StrPath)
End Function

Function CompareSheets(ByRef strProgramPath)
  Dim strToolDescription, strCurColumnValue, idxToolLookupMatch, idxMatchResult
  Set Excel = Wscript.CreateObject("Excel.Application")

  Set bookToolMaster = Excel.Workbooks.Open(strToolListMaster)
  Set bookToolM1 = Excel.Workbooks.Open(strToolListM1)
  Set bookToolM2 = Excel.Workbooks.Open(strToolListM2)
  Set bookToolProgram = Excel.Workbooks.Open(strProgramPath)

  'Create a reference to the master tool list worksheet
  Set sheetToolMaster = bookToolMaster.Worksheets(strMasterToolBookSheetName)

  'Create a reference to the machines' tool list worksheets
  Set sheetToolM1 = bookToolM1.Worksheets(1)
  Set sheetToolM2 = bookToolM2.Worksheets(1)

  'Create a reference to the program tool list worksheet
  Set sheetToolProgram = bookToolProgram.Worksheets(1)

  'Get the second column from the machines' exported tool list
  Set cToolColM1 = sheetToolM1.Columns(2)
  Set cToolColM2 = sheetToolM2.Columns(2)

  'Get the tool number column from the master sheet
  Set rToolMasterDataRange = sheetToolMaster.Range("A4:G2000")

  'Now that the sheets are ready, make excel visible to the user
  Excel.visible = True

  'For each row found in the program sheet
  For Each r In sheetToolProgram.UsedRange.Rows
    'Get the cell value
    strCurColumnValue = r.Columns(1).Value

    'Search for the tool number in the column from M1
    idxMatchResult = Excel.Application.Match(strCurColumnValue, cToolColM1, 0)

    'If a match was found
    If IsNumeric(idxMatchResult) Then
      r.Columns(2).Value = "P" & sheetToolM1.Cells(idxMatchResult, 1).Value
    Else
      r.Columns(2).Value = strNotFoundValue
      r.Columns(2).Font.ColorIndex = intNotFoundColorIndex
    End If

    'Search for the tool number in the column from M2
    idxMatchResult = Excel.Application.Match(strCurColumnValue, cToolColM2, 0)
 
    'If a match was found
    If IsNumeric(idxMatchResult) Then
      r.Columns(3).Value = "P" & sheetToolM2.Cells(idxMatchResult, 1).Value
    Else
      r.Columns(3).Value = strNotFoundValue
      r.Columns(3).Font.ColorIndex = intNotFoundColorIndex
    End If

    'strip the `T` so we have just the number
    strCurColumnValue = Replace(strCurColumnValue, "T", "")

    'Search for the tool number in the master sheet
    strToolDescription = Excel.Application.Vlookup(CInt(strCurColumnValue), rToolMasterDataRange, 7)
  
    r.Columns(4).Value = strToolDescription
  
  'Itterate to the next row in the program tool list
  Next

  'Insert a new row at the top, shifting everything down
  sheetToolProgram.Rows(1).Insert(Shift=xlShiftDown)

  'Write and bold the machine that was searched into the top row
  sheetToolProgram.Rows(1).Font.Bold = True
  sheetToolProgram.Cells(1,1).Value = "TOOL"
  sheetToolProgram.Cells(1,2).Value = "M1"
  sheetToolProgram.Cells(1,3).Value = "M2"
  sheetToolProgram.Cells(1,4).Value = "DESCRIPTION"
End Function

'Run the Program
Main()
```

Now we know that Excel is not just a great tool for data and charts, but we can also use it for automation of processing as well. This is great knowledge to have for future problems that could use a bit of scripting. I find this so valuable, that it finally got me to create this blog and share it with everyone.
