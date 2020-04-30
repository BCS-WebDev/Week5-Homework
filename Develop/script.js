
// on dom load
$(document).ready(function() {
    // function to append timeblocks
    function appendTimeblocks() {
        var container = $(".container");  // get timeblock container
        container.addClass("mb-5");      // add bottom margin

        for (var i = 9; i < 18; i++) {      // for each hour from 9am - 17pm
            var timeblockRow = $("<div>");      // create div
            timeblockRow.addClass("row timeblock");      // give div row class
            timeblockRow.attr("data-rowindex", i - 9);    // giv div dataset attribute row index for access from save button
            container.append(timeblockRow);     // append to container

            var hour = $("<div>");      // create row for hour label
            hour.addClass("hour pt-4 text-center border-top border-dark");  // style override
            hour.attr("data-hourindex", i);    // for access to update time
            hour.width("75px");      // set width
            if (i < 12) {         // if hour less than 12
                hour.text(i + " AM");    // set hour
            } else if (i >= 12) {     // if hour greater than 12
                hour.text((i - 12) + " PM");    // adjust hour to standard hour
            }
            timeblockRow.append(hour);    // append hour to current row

            var event = $("<textarea>");     // create textarea for event input
            event.addClass("flex-fill border-top border-bottom border-dark"); // style override
            if (moment().get("hour") == i) {      // get hour(0-24) using moment.js - compare to current timeblock
                event.addClass("bg-danger");     // red if current hour
                hour.text(moment().format('h:mm A'));    // display full time
            } else if (moment().get("hour") > i) {
                event.addClass("bg-secondary");     // gray if past hours
            } else if (moment().get("hour") < i) {
                event.addClass("bg-success");      // green if future hours
            }
            timeblockRow.append(event);    // append event to current row

            var saveButton = $("<button>");    // create save button for event
            saveButton.addClass("saveBtn border-dark");   // style override
            saveButton.width("75px");   // set width
            timeblockRow.append(saveButton);     // append save button to current row

            var saveIcon = $("<img>");     // create img for save icon
            saveIcon.attr("src", "Assets/saveIcon.png");   // select source
            saveButton.append(saveIcon);   // append save icon to save button
        }
    }

    // fill timeblock with respective events
    function fillEvents() {
        var tempEventsArray = JSON.parse(localStorage.getItem("timeblockEvents"));  // parse stored events
        if (tempEventsArray == null) { return; }   // return early if none exists

        timeblockEvents = tempEventsArray;   // if exists, set to timeblockevents array

        var eventFields = $("textarea");   // get all event fields
        for (var i = 0; i < timeblockEvents.length; i++) {   // for each event
            eventFields[i].value = timeblockEvents[i];      // fill existing event
        }
    }

    // save event tied to save button in row
    function saveEvents(rowObject) {
        var rowIndex = rowObject.dataset.rowindex;     // get timeblock's data index value
        timeblockEvents[rowIndex] = rowObject.children[1].value; // get & store event from chosen timeblock to timeblockevents array
        
        localStorage.setItem("timeblockEvents", JSON.stringify(timeblockEvents));  // store timeblockevents array in local storage
    }

    // get date suffix for date in jumbotron
    function getDateSuffix() {
        var dateSfx;    // string to store date suffix
        if (moment().date() % 10 == 1) {   // if date modulo 10 is 1
            dateSfx = "st";   // suffix is st
        } else if (moment().date() % 10 == 2) { // if date modulo 10 is 2
            dateSfx = "nd";   // suffix is nd
        } else if (moment().date() % 10 == 3) { // if date modulo 10 is 3
            dateSfx = "rd";   // suffix is rd
        } else {
            dateSfx = "th";   // suffix is th
        }

        return dateSfx;     // return sfx
    }

    // get current date in string form
    function getCurrentDay(Suffix) {   // pass date suffix as argument
        var day = daysOfTheWeek[moment().day()] + ", " + monthsOfTheYear[moment().get("month")] +
                        " " + moment().get("date") + Suffix;    // create day string
        
        return day;     // return day
    }

    // save button event bubbling
    var saveButtonBubble = $(".container");    // get button container for onclick event
    saveButtonBubble.on("click", function(event) {   // on click any button inside container
        if (event.target.matches("button")) {       // if event matches button
            saveEvents(event.target.parentElement);   // pass button's parent, row, to saveEvents
        } else if (event.target.matches("img")) {   // if event matches img
            saveEvents(event.target.parentElement.parentElement); // pass button's parent's parent, row, to saveEvents
        }
    });

    // update current time
    function updateTime() {
        var updateCurrentTime = setInterval(     // set interval to update current time / reload webpage
            function() {
                if (moment().minute() == 0) {   // if minute equals 0 (hour has changed)
                    var currentTimeBlock = $(".row[data-rowindex=" + (moment().hour() - 9) + "]")[0];   // get current timeblock
                    if (currentTimeBlock) {
                        currentTimeBlock.children[1].classList.remove("bg-success");  // remove text area green
                        currentTimeBlock.children[1].classList.add("bg-danger");   // add text area red
                    }

                    var prevTimeBlock = $(".row[data-rowindex=" + (moment().hour() - 10) + "]")[0];   // get current timeblock
                    if (prevTimeBlock) {
                        var hour;   // hour to set
                        if (moment().hour() < 12) {         // if hour less than 12
                            hour = (moment().hour() - 1) + " AM";    // set hour
                        } else if (moment().hour() == 12) {     // if houris 12
                            hour = moment().hour() + " PM";    // set 12 PM
                        } else if (moment().hour() > 12) {     // if hour greater than 12
                            hour = (moment().hour() - 1 - 12) + " PM";    // adjust hour to standard hour
                        }
                        prevTimeBlock.children[0].textContent = hour;

                        prevTimeBlock.children[1].classList.remove("bg-danger");  // remove text area red
                        prevTimeBlock.children[1].classList.add("bg-secondary");   // add text area gray
                    }
                }
    
                var currentHourElement = $(".hour[data-hourindex=" + moment().hour() + "]")[0];   // get hour of current timeblock
                if (currentHourElement) {        // if it exists (not undefined)
                    currentHourElement.textContent = moment().format('h:mm A');   // update time
                }
            },
            30000   // every 30000 milliseconds (30 seconds)
        );
    }

    // days & months array for current day in jumbotron
    var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsOfTheYear = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];
    // events initialized to empty strings
    var timeblockEvents = ["", "", "", "", "", "", "", "", ""];

    var dateSuffix = getDateSuffix();   // get date suffix
    var currentDay = getCurrentDay(dateSuffix);   // get current day with date suffix
    var currentDayField = $("#currentDay");    // get current day element
    currentDayField.text(currentDay);      // set current day element

    appendTimeblocks();       // call appendTimeblocks() 
    fillEvents();            // call fillEvents()
    updateTime();           // call updateTime()
    
});