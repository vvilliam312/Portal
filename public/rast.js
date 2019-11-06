function toMin(h,min){
    return h * 60 + min
  }


function rastOrNot(date){
    

    var d = new Date(/*date*/)
    var day=d.getDate();var month=d.getMonth();var year=d.getFullYear();var x=day +"."+  month+"."+year;
    var h = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()
    var time = h * 60 + min
   
    function addsec(){
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
addsec();

    /*console.log(day +"."+  month+"."+year)*/
    document.getElementById("datum").innerHTML=x;
    var clock ="Tid: " + h + ":" +min;
    document.getElementById("tid").innerHTML=clock;
    if((time >= toMin(9,15) && time <= toMin(9,32)) || (time >= toMin(10,45) && time <= toMin(11,27)) || (time >= toMin(12,40) && time <= toMin(12,47)) || (time >= toMin(14,0) && time <= toMin(14,17))
     ||(time >= toMin(15,30) && time <= toMin(16,59))){ //Tiden då det blir grönt=rast;
        document.body.style.backgroundColor = 'green';
        document.getElementById("rast").innerHTML="Rast";
      $(".container").hide();
        
    }else if((time >= toMin(9,33) && time <= toMin(9,34)) || (time >= toMin(11,28) && time <= toMin(11,29)) || (time >= toMin(12,48) && time <= toMin(12,49)) || (time >= toMin(14,18) && time <= toMin(14,19))){
         document.body.style.backgroundColor = 'yellow';
         document.getElementById("rast").innerHTML="Rasten slutar snart";
         
         if((time >= toMin(9,34) && time <= toMin(9,35)) || (time >= toMin(11,29) && time <= toMin(11,30)) || (time >= toMin(12,49) && time <= toMin(12,50)) || (time >= toMin(14,19) && time <= toMin(14,20))){
          play();
          }
         }
    else if(time >= toMin(17,0) ||time < toMin(8,0)){ //Tiden då alla lampor släcks
      document.body.style.backgroundColor = 'black';
      $(".container").hide();
    }
    else{//Röda lyser men inte gröna=lektion
        
        document.body.style.backgroundColor = 'red';
	document.getElementById("rast").innerHTML="Inte Rast"
     $(".container").hide();
    }
    
    
   

}

setInterval(rastOrNot,1000);
 function play(){
  $(".container").show();

       var sekunderID = setInterval(secondPlay, 1000);
       function sek() {
     sekunderID;
     }

 var minID = setInterval(minutePlay, 10000);
       function mins() {
     minID;
     }
   var myInterval = setInterval(function(){
     foo();
},59000);

var foo = function () {
    clearInterval(minID);
    clearInterval(sekunderID);
    clearInterval(myInterval);
    
};

function secondPlay() {
    $("body").removeClass("play");
    var aa = $("ul.secondPlay li.active");

    if (aa.html() == undefined) {
        aa = $("ul.secondPlay li").eq(0);
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");

    }
    else if (aa.is(":last-child")) {
        $("ul.secondPlay li").removeClass("before");
        aa.addClass("before").removeClass("active");
        aa = $("ul.secondPlay li").eq(0);
        aa.addClass("active")
            .closest("body")
            .addClass("play");
    }
    else {
        $("ul.secondPlay li").removeClass("before");
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");
    }

}

function minutePlay() {
    $("body").removeClass("play");
    var aa = $("ul.minutePlay li.active");

    if (aa.html() == undefined) {
        aa = $("ul.minutePlay li").eq(0);
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");

    }
    else if (aa.is(":last-child")) {
        $("ul.minutePlay li").removeClass("before");
        aa.addClass("before").removeClass("active");
        aa = $("ul.minutePlay li").eq(0);
        aa.addClass("active")
            .closest("body")
            .addClass("play");
    }
    else {
        $("ul.minutePlay li").removeClass("before");
        aa.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active")
            .closest("body")
            .addClass("play");
    }
   

}
    }

  /* function testTime(){
  var date ="October 1, 2019 09:34:00";  
  rastOrNot(date)
    
    
    }testTime();*/






   
