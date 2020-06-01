/**
* On the submit event of the linked Google form, determine a corresponding position on a linked spreadsheet, and fill in the value w/ input value (submission name)
* With this script linked to two different Google forms (Tutors and Tutees), as submissions are put in for each form, generate a schedule with all submissions
* @param e: Event storing info about the form submit
*/
function onSubmit(e) {
  var ss = SpreadsheetApp.getActive();
  var sheets = ss.getSheets();
  var OutputSheet = ss.getSheetByName("Schedule");
  
  //all values sent in through the form
  var values = e.values;
  
  //determine wether a submission was from tutors or tutees
  var source = e.source.getActiveSheet().getName();
  var tutor = false;
  if (source == "Tutors") tutor = true; 
  
  //fill in the right cell on the schedule
  setCell(values, OutputSheet, tutor);
}

/**
* Given an array of values sent in on submission of a Google form, determine which cell in the Schedule the submitter's name should be placed in and place it
* @param values; array of values passed in when the Google form was submitted
* @param OutputSheet: Sheet holding the "Schedule"
* @return: none
*/
function setCell(values, OutputSheet, tutor) {
  var name = values[1];
  
  var day = "";
  var time = "";
  for (I = 2; I < values.length; I++) {
    if (values[I] != "") {
      day = getDayFromIndex(I-2);
      time = values[I];
    }
  }
  
  var rangeString = "";
  var namedRanges = OutputSheet.getNamedRanges();
  for (var range of namedRanges) {
    if (range.getName() == day) {
      rangeString += range.getRange().getA1Notation()[0];
      break;
    }
  }
  
  var row = 0;
  row = getRowIndex(time, OutputSheet);
  var value = "";
  
  if (tutor) {
    row = row + 1;
    rangeString += row;
    value = OutputSheet.getRange(rangeString).getValue() + ", " + name;
  }
  else {
    rangeString += row;
    value = name;
  }
  
  OutputSheet.getRange(rangeString).setValue(value);
}

/**
* Helper function to determine which day of the week is represented by a number (Monday-Friday is 1-5)
* @param index: value from 1-5
* @return: day represented by the index paused in
*/
function getDayFromIndex(index) {
  var day = "";
  switch (index) {
    case 0:
      day = "Monday";
      break;
    case 1:
      day = "Tuesday";
      break;
    case 2:
      day = "Wednesday";
      break;
    case 3:
      day = "Thursday";
      break;
    case 4:
      day = "Friday";
      break;
  }
  return day;
}

/**
* Helper function to get the row number based on a given value
* @param time: value of which the row number needs to be identified
* @param OutputSheet: Sheet holding the "Schedule"
* @return: row number of the passed in value
*/
function getRowIndex(time, OutputSheet) {
  var range = OutputSheet.getRange("A:A");
  for (var I = 1; I < range.getNumRows(); I++) {
    if (range.getCell(I, 1).getValue() == time) {
      return I;
    }
  }
}

