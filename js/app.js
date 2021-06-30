var _front_button = document.getElementById("month_front_button"); 
var _back_button = document.getElementById("month_back_button"); 
var _month = document.getElementById("month_year"); 
var _day = document.querySelectorAll(".day"); 

var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var daysFull = []

function addDays(start,end,day){ 
    console.log("called"); 
    for(var i = 0; i < 42; i++){
        if(i >= start && i <=end){ 
            daysFull.push(1);
        }else{ 
            daysFull.push(0);
        }
    }
}






function returnMonthInInt(m){
    month = m[0]
    year = m[1]
    return new Date(Date.parse(month + "1 " + year)).getMonth() + 1; 
}


function returnDays(m){
    let month_year = m.innerText.split(" ");  
    month_in_int = returnMonthInInt(month_year)
    console.log(month_in_int); 
    if(month_in_int == 2 && parseInt(month_year[1])%4 == 0 ) { 
        return 29
    }else if(month_in_int%2 != 0){ 
        return 31
    }else if(month_in_int%2 == 0){ 
        return 30
    }else{ 
        return 28
    }
}



// _day.forEach((d)=>{
//     if(parseInt(d.innerText) + 1<= v){
//         d.innerText = (parseInt(d.innerText) ) + 1
//     }else{ 
//         d.innerText = (parseInt(d.innerText) % v) + 1
//     }
// }); 

function f(v) {
    for(var i = 0 ; i < _day.length; i++) {
        if(parseInt(_day[i].innerText) + 1<= v){
            _day[i].innerText = (parseInt(_day[i].innerText) % v) + 1
        }else{ 
            _day[i].innerText = (parseInt(_day[i].innerText) % v) + 1
        }
    }
}




_front_button.addEventListener('click', () => {
    var v = returnDays(_month); 
    console.log(v); 

    f(v); 

    

    addDays(7,(7+29), 29);
    console.log(daysFull); 
    daysFull = []; 

    
});


function highlightDate(){ 
    if(!d.innerText == ""){
        _date_day.forEach((d) =>{ 
            d.classList.remove("date_day_activate"); 
        }); 
        d.classList.add("date_day_activate"); 
    }
}