---
title: "Matsuura Cell Manager Excel Automation"
excerpt: "Learning Visual Basic to automate Excel and compare some CSV files."
coverImage: "/assets/blog/excel-automation/cover.jpg"
# coverImage: "https://placeimg.com/1000/500/arch"
date: "2022-04-29T13:00:00.0Z"
author:
  name: Kevin Hill
  picture: "/assets/blog/kh.jpg"
ogImage:
  url: "/assets/blog/excel-automation/cover.jpg"
---

## Problem

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