
// on dom load
$(document).ready(function() {
    function appendTimeblocks() {
        var container = $(".container");
        container.addClass("mb-5");

        for (var i = 9; i < 18; i++) {
            var timeblockRow = $("<div>");
            timeblockRow.addClass("row");
            timeblockRow.attr("data-rowindex", i - 9);
            container.append(timeblockRow);

            var hour = $("<div>");
            hour.addClass("hour pt-4 text-center border-top border-dark");
            hour.width("75px");
            if (i <= 12) {
                hour.text(i + " AM");
            } else if (i > 12) {
                hour.text((i - 12) + " PM");
            }
            timeblockRow.append(hour);

            var event = $("<textarea>");
            event.addClass("flex-fill border-top border-bottom border-dark")
            if (moment().get("hour") == i) {
                event.addClass("bg-danger");
            } else if (moment().get("hour") > i) {
                event.addClass("bg-secondary");
            } else if (moment().get("hour") < i) {
                event.addClass("bg-success");
            }
            timeblockRow.append(event);

            var saveButton = $("<button>");
            saveButton.addClass("saveBtn border-dark");
            saveButton.width("75px");
            timeblockRow.append(saveButton);

            var saveIcon = $("<img>");
            saveIcon.css("z-index","1");
            saveIcon.attr("src", "Assets/saveIcon.png");
            saveButton.append(saveIcon);
        }
    }

    var timeblockEvents = ["", "", "", "", "", "", "", "", ""];

    function fillEvents() {
        var tempEventsArray = JSON.parse(localStorage.getItem("timeblockEvents"));
        if (tempEventsArray == null) { return; }

        timeblockEvents = tempEventsArray;
        var eventFields = $("textarea");

        for (var i = 0; i < timeblockEvents.length; i++) {
            eventFields[i].value = timeblockEvents[i];
        }
    }

    function saveEvents(rowObject) {
        var rowIndex = rowObject.dataset.rowindex;
        timeblockEvents[rowIndex] = rowObject.children[1].value;
        
        localStorage.setItem("timeblockEvents", JSON.stringify(timeblockEvents));
    }

    function getDateSuffix() {
        var date;
        if (moment().date() % 10 == 1) {
            date = "st";
        } else if (moment().date() % 10 == 2) {
            date = "nd";
        } else if (moment().date() % 10 == 3) {
            date = "rd";
        } else {
            date = "th";
        }

        return date;
    }

    function getCurrentDay(Suffix) {
        var day = daysOfTheWeek[moment().day()] + ", " + monthsOfTheYear[moment().get("month")] +
                        " " + moment().get("date") + Suffix;
        
        return day;
    }

    var saveButtonBubble = $(".container");
    saveButtonBubble.on("click", function(event) {
        if (event.target.matches("button")) {
            saveEvents(event.target.parentElement);
        } else if (event.target.matches("img")) {
            saveEvents(event.target.parentElement.parentElement);
        }
    });

    
    var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsOfTheYear = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];

    var dateSuffix = getDateSuffix();
    var currentDay = getCurrentDay(dateSuffix);
    var currentDayField = $("#currentDay");
    currentDayField.text(currentDay);

    appendTimeblocks();
    fillEvents();


});