function toMin(h,min){
    return h * 60 + min
  }
function rastOrNot(date){
    var d = new Date(/*date*/)
    var h = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()
    var time = h * 60 + min
    console.log(time)
    if((time >= toMin(9,15) && time <= toMin(9,35)) || (time >= toMin(10,45) && time <= toMin(11,30)) || (time >= toMin(12,40) && time <= toMin(12,50)) || (time >= toMin(14,0) && time <= toMin(14,20))
     ||(time >= toMin(15,30) && time <= toMin(16,59))){ //Tiden då det blir grönt=rast;
        document.body.style.backgroundColor = 'green'
    }
    else if(time >= toMin(17,0) ||time < toMin(8,0)){ //Tiden då alla lampor släcks
      document.body.style.backgroundColor = 'black'
    }
    else{//Röda lyser men inte gröna=lektion
        document.body.style.backgroundColor = 'red';
    }
    
}
setInterval(rastOrNot,1000);
/*function testTime(){
  var date ="October 1, 2019 09:16:00";  
  rastOrNot(date)
    
    
    }testTime();*/
