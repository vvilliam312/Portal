
const cheerio = require('cheerio');
const request = require('request');
const sqlite3 = require('sqlite3').verbose();
var iconv = require('iconv');
let db = new sqlite3.Database('foodlist.db');
const parse = require("node-html-parser").parse;

getFoodFromOptima();


function splitDate($){
	var date= $('.mainText h3').html().split("<br>")[0].match(/(\d{1,2}\.)?\d{1,2}-\d{1,2}.\d{1,2}.\d{4}/)[0];
	//console.log(date);
	const day = parseInt(date.split("-")[0]) - 0; //1
    const dateSplit = date.split(".");
    const monthSplit = dateSplit[1].split("-");
    const month = parseInt(monthSplit[0]) - (monthSplit[1] == null ? 1 : 1);

    const year = dateSplit[dateSplit.length - 1];
    
    const d = year+"-"+zerofill(monthSplit)+"-"+zerofill(day);
    console.log(d + " HEJ")
  
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


function getFoodFromOptima(){

	const url = "https://www.optimaedu.fi/svenska/for-studerande/studieguiden/lunchmeny-/-lounasmenu.html";
	request({
		method: 'GET',
		url: url
		}, (err, res, body) => {
		const $ = cheerio.load(body,{decodeEntities:false})
		var food = $('.mainText h4+p').map((_,x)=> $(x).html());
		var datum= splitDate($);
		console.log(datum +" ASD")


		new Promise(function(resolve,reject){
			var sqldate= `SELECT COUNT(*) AS antal,id FROM todaysfood WHERE date = '${d}'`
			db.get(sqldate, [], (err, row) => {
	
  console.log(sqldate +" " + row.antal +" match");
  if(!row.antal){console.log("checkDb FALSE");
	resolve(false);
	
	}else{console.log("checkDb TRUE");
	resolve(true)
	}


	})
		}).then(function(res)	{
			if(res){
				console.log("Up to date");
				}else{
					console.log("Uppdatera");
				}
			})
		
		//console.log(food.get()[0]);
		
		
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
	/*switch (test2) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    
    day = "Monday";
	
    break;
  case 2:
     day = "Tuesday";
     //console.log(result.sv)
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
	}
		*/
	})
})


}




function toUTF8(body) {
  // convert from iso-8859-1 to utf-8
  var ic = new iconv.Iconv('iso-8859-1', 'utf-8');
  var buf = ic.convert(body);
  return buf.toString('utf-8');
}



