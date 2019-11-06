
const cheerio = require('cheerio');
const request = require('request');
const sqlite3 = require('sqlite3').verbose();
var iconv = require('iconv');
let db = new sqlite3.Database('foodlist.db');
const parse = require("node-html-parser").parse;
var cron = require('node-cron');


getFoodFromOptima();

cron.schedule('0 0 * * *', () => {
  getFoodFromOptima();
 console.log("KÖRDES");
});



function splitDate($){
	var date= $('.mainText h3').html().split("<br>")[0].match(/(\d{1,2}\.)?\d{1,2}-\d{1,2}.\d{1,2}.\d{4}/)[0];
	//console.log(date);
	const day = parseInt(date.split("-")[0]) - 0; //1
    const dateSplit = date.split(".");
    const monthSplit = dateSplit[1].split("-");
    const month = parseInt(monthSplit[0]) - (monthSplit[1] == null ? 1 : 1);

    const year = dateSplit[dateSplit.length - 1];
    
    const d = year+"-"+zerofill(monthSplit)+"-"+zerofill(day);
    //console.log(d + " HEJ")
  
 return d
}




function checkDb(d){
	var svar=false;
	
		
		
var sqldate= `SELECT COUNT(*) AS antal,id FROM todaysfood WHERE date = '${d}'`
db.get(sqldate, [], (err, row) => {
	
  console.log(sqldate +" " + row.antal +" match");
  if(!row.antal){console.log("checkDb FALSE");
	resolve(false);
	
	}else{console.log("checkDb TRUE");
	resolve(true)
	}


	})

}






function zerofill(param){
	if(param<10){param="0"+param}
	return param	
}



function addDays(date, amount) {
    var dateString = date;
    var myDate = new Date(dateString);
    
    //add a day to the date
     myDate.setDate(myDate.getDate() + amount);
     var y = myDate.getFullYear(),
    m = myDate.getMonth() + 1, // january is month 0 in javascript
    d = myDate.getDate();
var pad = function(val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str};
dateString = [y, pad(m), pad(d)].join("-");
return dateString;
  }



function getFoodFromOptima(){
new Promise(function(resolve,reject){
	const url = "https://www.optimaedu.fi/svenska/for-studerande/studieguiden/lunchmeny-/-lounasmenu.html";
	request({
		method: 'GET',
		url: url
		}, (err, res, body) => {
		const $ = cheerio.load(body,{decodeEntities:false})
		var food = $('.mainText h4+p').map((_,x)=> $(x).html());
		var datum= splitDate($);
//		console.log(datum +" ASD")
		resolve({food:food.get(),datum:datum})
})
	}).then(function(res)	{
	//console.log(res);
	let result="";
		var answerfood=[];
		var finalList=res.food;
		
		finalList.map(item => {
		
			var splitted = item.split("<br>");
			//console.log(splitted + " ? SPLITTE? ");
			
			if(splitted.length <=2 ){
//console.log(splitted[0] + " 0");
      result = {
        sv: splitted[0],
        fi: splitted[1] 
        
      };
     
    }
    else{
      result = {
        sv: splitted[0]+ " & " + splitted[1],
        fi: splitted[2] + " & " + splitted[3]
      };
			
			
		}
		answerfood.push(result);
		//console.log(result.sv);
	
	
	
}) //map ends	
return {food:answerfood,datum:res.datum}	
}).then(function(res){
console.log(res.datum);
//console.log(res.food[1].sv);



var sqldate= `SELECT COUNT(*) AS antal,id FROM todaysfood WHERE date = '${res.datum}'`


			db.get(sqldate, [], (err, row) => {
	
  console.log(sqldate +" " + row.antal +" match");
  if(!row.antal){
	for(var f=0; f<res.food.length;f++){
		console.log(res.food[f].sv);
		
	//console.log("checkDb FALSE");
	 var insert= `INSERT INTO todaysfood(svfood,fifood,date) VALUES(?,?,?)`;
  var params = [res.food[f].sv, res.food[f].fi,addDays(res.datum,f)];
     db.run(insert, params, function(err){
      if(err){
        console.log(err);
      }
  
  
    });
    }
    
	}else{console.log("checkDb TRUE" + " REDAN INLAGD");
	
	
	}
	
	})
})

}//END OF FUNCTION 



		/*var sqldate= `SELECT COUNT(*) AS antal,id FROM todaysfood WHERE date = '${d}'`
			db.get(sqldate, [], (err, row) => {
	
  console.log(sqldate +" " + row.antal +" match");
  if(!row.antal){console.log("checkDb FALSE");
	resolve(false);
	
	}else{console.log("checkDb TRUE");
	resolve(true)
	}
*/

	
	/*
			if(res){
				console.log("Up to date");
				}else{
					console.log("Uppdatera");
				}
				return res
			}).then(function(res) {
				
				console.log()
				}
			*/
		
		//console.log(food.get()[0]);
		
		/*
		let result;
		var answerfood=[];
		var finalList=food.get();
		
		finalList.map(item => {
			
			var splitted = item.split("<br>");
			if(splitted.length <=2 ){

      result = {
		//date:day,
        sv: splitted[0],
        fi: splitted[1]
      };
     
    }
    else{
      result = {
		//date:day,
        sv: splitted[0]+ " & " + splitted[1],
        fi: splitted[2] + " & " + splitted[3]
      };
			answerfood.push(result);
			
		}
		
		//console.log(result.sv);
		var test1= new Date();
		var test2 = test1.getDay();
	
	var day;
	var finalResult = []; 
	
	console.log(result);
	
	
		*/
	








function toUTF8(body) {
  // convert from iso-8859-1 to utf-8
  var ic = new iconv.Iconv('iso-8859-1', 'utf-8');
  var buf = ic.convert(body);
  return buf.toString('utf-8');
}



