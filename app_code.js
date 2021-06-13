// Try with node js.

var _front_button = document.getElementById("month_front_button"); 
var _back_button = document.getElementById("month_back_button"); 
var _month_year = document.getElementById("month_year"); 
var monthYear = _month_year.innerText.split(" ");
var _event_box = document.querySelectorAll(".event_box"); 
var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var _day = document.querySelectorAll(".day"); 
var _date_day = document.querySelectorAll(".date_day"); 
var eventName = document.getElementById("eventName"); 
var eventTime = document.getElementById("eventTime"); 
var todayDate = new Date(); 


var prevPressed =  null; 
var currentPressed = null; 
var totalMonthDay = 0; 


var  ddays = returnDays(parseInt(monthYear[1]), monthName.indexOf(monthYear[0])+1);
var eventInput = document.createElement("input"); 

//Within c_day.
var _c_day = document.querySelectorAll(".c_day"); 
var _c_day_more = document.querySelectorAll(".c_day_more"); 
var _c_day_more_x = document.querySelectorAll(".c_day_more_x"); 
var previousEventFlow = null; 
var currentEventFlow = null; 
var _event_detail_page = document.getElementById("event_detail_page"); 
var addEvent = true; 


this.addEventListener("load", ()=>{
    var todayDay = todayDate.getDate(); 
    var newDate = changeMonthYear("current"); //["August", "2021", "8"]
    manipulateDateOnCalender(newDate);
    _date_day.forEach((d) =>{
        if(!d.innerText == ""){ 
            if(d.innerText == todayDay){ 
                d.classList.add("date_day_activate");
                currentPressed = d; 

            }
        } 

    });
}); 


function changeMonthYear(fb){ 
    let indexOfNext; 
    let my = _month_year.innerText.split(" ") 
    if(fb == "forward"){indexOfNext = (monthName.indexOf(my[0])+1) % 12;}
    if(fb == "backward"){
        indexOfNext = ((monthName.indexOf(my[0])-1) % 12) 
        if(indexOfNext < 0){indexOfNext = 11;}
    }
    if(fb == "current"){indexOfNext = (monthName.indexOf(my[0]))}
    let nextMonth = monthName[indexOfNext]; 
    if(my[0] == monthName[11] && fb=="forward"){ // If current month is Dec, on this click, change it to next year
        my[1] = parseInt(my[1]) + 1; 
    }else if(my[0] == monthName[0] && fb=="backward"){ 
        my[1] = parseInt(my[1]) -1 ; 
    }
    nextYearMonth = nextMonth+ " "+ my[1];
    _month_year.innerHTML = nextYearMonth; 
    return (nextYearMonth + " " +parseInt(indexOfNext+1)).split(" "); 
}

// Returns how many days in a month, 28/29/30/31
function returnDays(year, month){ 
    console.log(year, month); 
    return new Date(year, month, 0).getDate(); 
}


// On html page, add dates of day into calender from start of the day to end of the day in that month.  
// Returns array ["August", "2021", "8"]
function manipulateDateOnCalender(newDate){ 
    var dayCount = 0 ;
    var totalDays = returnDays(newDate[1], newDate[2]); // Year and month in integer.
    var date = new Date(Date.parse(newDate[0] + "1 " + newDate[1])); // (month, day, year)
    // Increment number between start and end date rest should be empty.
    // Added +6 because it should start from first element + 6 place 
    // when 0 == sun, 0 elemetn in _day array starts with monday, so when click +6, it'll start with 6th element which is sunday(7).
    var startDay = date.getDay()+6; // starts form 0 = sun -> 6 = sat
    var endDay = date.getDay() + totalDays+6; 
    for(var i = 0; i < _day.length; i++){ 
        if(i >= startDay&& i < endDay){
            dayCount++; 
            _day[i].innerHTML = dayCount; 
        }else{ 
            _day[i].innerHTML = " "; 
        }    
    }
    dayCount = 0; 
}

// Front button click:  move to next month/year 
_front_button.addEventListener("click", () =>{  
    ddays = returnDays(parseInt(monthYear[1]), monthName.indexOf(monthYear[0])+1);
    var newDate = changeMonthYear("forward"); //["August", "2021", "8"]
    manipulateDateOnCalender(newDate);
}); 

// Back button clicked, moved to previous month/year.
_back_button.addEventListener("click", () =>{  
    ddays = returnDays(parseInt(monthYear[1]), monthName.indexOf(monthYear[0])+1);
    var newDate = changeMonthYear("backward"); //["August", "2021", "8"]
    manipulateDateOnCalender(newDate);
}); 



_date_day.forEach((d) =>{ 
    d.addEventListener("click", () =>{ 


        if(!d.innerText == ""){
            prevPressed = currentPressed; 
            currentPressed = d; 
            console.log(currentPressed.innerText);
            console.log(d == currentPressed); 

            currentPressed.classList.add("date_day_activate"); 
            prevPressed.classList.remove("date_day_activate");
            if(d == currentPressed){
                d.classList.add("date_day_activate");
            }

        }
    }); 
}); 











//




function createPTag(text){ 
    var tagP = document.createElement("p"); 
    var tagPText = document.createTextNode(text); 
    tagP.appendChild(tagPText); 
    return tagP; 
}

// Crete event box 
function createEventBox(eventName, eventTime){ 
    var eventDiv= document.createElement("div");
    eventDiv.classList.add("event_box")
    // Adding event deatil
    eventDiv.append(createPTag(eventName + " ")); // Adding name
    var eventTimeSplit = eventTime.split(" "); 
    // TODO: add a checking statment about time between 00:00 - 23:00
    var eventTimeDetail = " " 
    eventTimeDetail += (parseInt(eventTimeSplit[0]) <= 9) ? "0"+eventTimeSplit[0]+":00 - " : eventTimeSplit[0]+":00 - "; 
    eventTimeDetail += (parseInt(eventTimeSplit[1]) <= 9) ? "0"+eventTimeSplit[0]+":00" : eventTimeSplit[1]+":00"; 

    console.log(eventTimeDetail);
    eventDiv.append(createPTag(eventTimeDetail)); 
    return eventDiv; 
    
} 
var inputTag = document.createElement("input"); 
inputTag.setAttribute("type","text"); 
inputTag.setAttribute("placeholder", "Enter");
inputTag.classList.add("event_text"); 

inputTag.addEventListener("click",()=>{ 
    console.log("adwf");
    addEvent = false; 
});
_c_day.forEach((e) =>{
    e.addEventListener("click", ()=>{ 
        _event_box = document.querySelectorAll(".event_box"); 
        // All the added event are loopd through ADDED EVENT
        for(var i =0; i < _event_box.length; i++){ 
            _event_box[i].addEventListener("click", ()=>{
                _event_detail_page.appendChild(_event_box[i]); 
            }); 
            preventAddingData(_event_box[i]);

        }
        // Only addevent if the mouse is touching the empty box, not when it tocuhes the buttons and the event boxes. 
        if(addEvent==true){
            eventName = document.getElementById("eventName"); 
            eventTime = document.getElementById("eventTime"); 
            if(!eventName.value== "" || !eventTime.value== ""){
                if(e.classList.contains("warning_box")){e.classList.remove("warning_box")};
                e.appendChild(createEventBox(eventName.value, eventTime.value)); 
            }else{
                e.classList.add("warning_box");
            }
        }
    }); 
}); 


//////////////////

var _day_box = document.querySelectorAll("#day_box"); 
_day_box.forEach((e) =>{ 
    totalMonthDay += 1; 
    if(totalMonthDay <= ddays){
        e.innerHTML = totalMonthDay; 
    }
}); 



_event_box.forEach((d) =>{    
    d.addEventListener("click", () =>{ 
        console.log("adf");
    }); 

}); 


// Resize the calender box to be on the center when clicked More button. 
_c_day_more.forEach((e) =>{
    e.addEventListener("click", ()=>{
        previousEventFlow = currentEventFlow; 
        currentEventFlow = e.parentNode; 
        previousEventFlow.classList.remove("event_overflow")
        currentEventFlow.classList.add("event_overflow")
    });
    preventAddingData(e);
});  
// Closes the centered box when clicked on the close button on the right. 
_c_day_more_x.forEach((e) =>{
    preventAddingData(e);
    e.addEventListener("click", ()=>{
        if(e.parentNode.classList.contains("event_overflow")){e.parentNode.classList.remove("event_overflow");}
    });
});  

// Function: makes sure when mouseover button, addEvent set to false so it cannot add the event when the buttons [More, Cross, EventBox ]  clicked. 

function preventAddingData(e){ 
    e.addEventListener("mouseover", ()=>{
        addEvent = false; 
    });
    e.addEventListener("mouseleave", ()=>{
        addEvent = true; 
    });
}








function createInputElemnt(){ 
    var inputTag = document.createElement("input"); 
    inputTag.setAttribute("type","text"); 
    inputTag.setAttribute("placeholder", "Enter");
    inputTag.classList.add("event_text"); 
    return inputTag; 
}

var inputTag = createInputElemnt();

var _event_detail = document.querySelector(".event_detail"); 
var _event_title_header = document.querySelectorAll("#event_title_header"); 
var _event_title = document.getElementsByTagName("event_title"); 
var _event_text = document.querySelectorAll(".event_text"); 


var changeDetail = true; 
_event_title_header.forEach((e)=>{ 
    e.addEventListener("click", ()=>{ 
        // if already added, don't add. 
        e.appendChild(inputTag);      


        
    
    }); 
})



