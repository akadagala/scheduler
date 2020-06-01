# scheduler
This Google Apps Script code, in conjunction with two Google forms, can be used to create a schedule based on form submissions from "Tutors" and "Tutees".

# Implementation
- Create a new folder on your Google drive
- Create a new Google Sheet in this folder called "ScheduleSheets", and format the schedule grid. The ScheduleSheets.xlsx file in this repo shows what the sheet should look like, FOR REFERENCE ONLY, don't try to download and use that file. 
- Create two Google Forms in the folder, "Tutors" and "Tutees" (or whatever relationship you would like, "Applicant" and "Interviewer" as another example). The first question on the both forms should be their name, and the second question should be a time selection (or multiple selections) from a multiple choice grid. Any of the questions after that don't matter for the code.
- Link the reponses for both of these forms to "ScheduleSheets". After, "ScheduleSheets" should have separate response sheets tabs for each form (check down at the bottom). Rename these sheets to match the relationships: "Tutors" and "Tutees", or whatever yours is.
- On "ScheduleSheets", open the script editor, and paste in the Javascript code. Change the string values in the first function to match whatever you named your two response sheets. Look for the comment that shows you which line to change. 
- Open up the trigger manager for the script (Edit, Current project's triggers/All your triggers) and add a trigger for the onSubmit function, Head deployment, Event source "From spreadsheet", Event type "On form submit".

Open up your forms and submit responses to test your Scheduler. The "tutee" will show up on the first line on the schedule, with the "tutor" underneath it. 
