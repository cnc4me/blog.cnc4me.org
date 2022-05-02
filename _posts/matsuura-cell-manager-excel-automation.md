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
'====================================================
' Script: compare.vbs
' Author: Kevin Hill
' Created: 4/28/22
' Usage:
'   This script can compare the exported contents
'   of a machines' tool list against to the extracted
'   tool list of a program.
'====================================================
MachineNumber = 1

Function CompareSheets(ByRef strProgramPath)
  Dim strToolDataPath, idxMatch
  Dim mToolBook, pToolBook, mToolSheet, pToolSheet

  strToolDataPath = "C:\ToolData_MC" & MachineNumber & ".csv"

  Set Excel = Wscript.CreateObject("Excel.Application")
  Set mToolBook = Excel.Workbooks.Open(strToolDataPath)
  Set pToolBook = Excel.Workbooks.Open(strProgramPath)
  Set mToolSheet = mToolBook.Worksheets(1)
  Set pToolSheet = pToolBook.Worksheets(1)

  Excel.visible = True
  
  idxMatch = Excel.Application.Match(r.Columns(1).Value, mToolSheet.Columns(2), 0)
  
  For Each r In pToolSheet.UsedRange.Rows
    If IsNumeric(idxMatch) Then
      r.Columns(2).Value = "P" & mToolSheet.Cells(idxMatch, 1).Value
    Else
      r.Columns(2).Value = "Missing"
      r.Font.ColorIndex = 3
    End If
  Next

  'Style the Results
  pToolSheet.Rows(1).Insert(Shift=xlShiftDown)
  pToolSheet.Cells(1,1).Value = "MACHINE " & MachineNumber
  pToolSheet.Cells(1,1).Font.Bold = True
End Function


'====================================================
' Usage:
'  Drag and drop a "Onnnn_tool.csv" extraction file
'  onto this script to run the comparison.
'====================================================
StrPath = ""

For Each s In Wscript.Arguments
  StrPath = StrPath & s
Next

CompareSheets(StrPath)
```

Now we know that Excel is not just a great tool for data and charts, but we can also use it for automation of processing as well. This is great knowledge to have for future problems that could use a bit of scripting. I find this so valuable, that it finally got me to create this blog and share it with everyone.
