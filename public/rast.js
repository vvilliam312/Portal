function toMin(h,min){
    return h * 60 + min
  }

console.log(  )
function rastOrNot(date){
    

    var d = new Date(/*date*/)
    var day=d.getDate();var month=d.getMonth();var year=d.getFullYear();var x=day +"."+  month+"."+year;
    var h = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()
    var time = h * 60 + min
   
    function asd(){
    if(min<10){
    min= "0"+min;   
    }
    if(h<10){
    h= "0"+h;   
    }
    if(sec<10){
    sec= "0"+sec;   
    }
}
asd();

    /*console.log(day +"."+  month+"."+year)*/
    document.getElementById("datum").innerHTML=x;
    var clock ="Tid: " + h + ":" +min;
    document.getElementById("tid").innerHTML=clock;
    if((time >= toMin(9,15) && time <= toMin(9,32)) || (time >= toMin(10,45) && time <= toMin(11,27)) || (time >= toMin(12,40) && time <= toMin(12,47)) || (time >= toMin(14,0) && time <= toMin(14,17))
     ||(time >= toMin(15,30) && time <= toMin(16,59))){ //Tiden då det blir grönt=rast;
        document.body.style.backgroundColor = 'green'
        document.getElementById("rast").innerHTML="Rast"
       
        
    }else if((time >= toMin(9,33) && time <= toMin(9,34)) || (time >= toMin(11,28) && time <= toMin(11,29)) || (time >= toMin(12,48) && time <= toMin(12,49)) || (time >= toMin(14,18) && time <= toMin(14,19))){
         document.body.style.backgroundColor = 'yellow'
         play();
         document.getElementById("rast").innerHTML="Rasten slutar snart"
         }
    else if(time >= toMin(17,0) ||time < toMin(8,0)){ //Tiden då alla lampor släcks
      document.body.style.backgroundColor = 'black'
      
    }
    else{//Röda lyser men inte gröna=lektion
        
        document.body.style.backgroundColor = 'red';
	document.getElementById("rast").innerHTML="Inte Rast"
     
    }
    
}

setInterval(rastOrNot,1000);


    
   
    
   
/*
function testTime(){
  var date ="October 1, 2019 14:00:00";  
  rastOrNot(date)
    
    
    }testTime();*/
