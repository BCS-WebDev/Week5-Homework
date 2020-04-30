# Week5-Homework
BootCampSpot Web Development - Week 4 Homework

# Notes on Quiz Schedulers
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Schedulers work like virtual personal assistants
that keep track of and remind you of your schedule. You tell it to alert when an event
is supposed to take place or periodically warn you of upcoming due dates. Typically,
these schedulers take the form of a calendar because people tend to plan months ahead
and not just days. But however big or small, the scheduler works the same way in that
you create an event, store it, and set reminders, by the hour, day, month, or year. 

# Motive & Action
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; In our case, we are tasked with creating a day
scheduler for the typical work day. Each hour from 9AM to 5PM will have its own 
time block where the user can store events. Each past time block will be colored 
gray, the current time block will be colored red while also updating the current time,
and, each future time block will be colored green. At the turn of each hour, the 
scheduler will refresh automatically to observe these changes. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We will go through the logic in no particular order.

* Run script after DOM loads
* Function to append time blocks
    - Create & append row as timeblock
    - Create, set, & append hour to row
    - Create, set, & append text area to row
    - Create, set, & append save button to row
    - Create, set, & append save icon to save button
* Have an array for time block events
    - Get & set events for each time block
* Save Button
    - Use event bubbling with the container
    - Store time block events array
* Set current day for jumbotron
    - Have array for days of the week & months of the year
    - Determine suffix for date
    - Get day & month
* Set interval to update current time
    - Find current time block by hour
    - Update current hour time text every 30000 milliseconds (30 seconds)
        - 30 seconds to account for delay
    - When minute turns 0 (at turn of every hour)
        - Update hour & text area color for current & previous time block
    - Does not account for new day
        - Refresh manually