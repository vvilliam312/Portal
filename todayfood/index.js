
const fetch = require("node-fetch");

const sqlite3 = require('sqlite3').verbose();
var Iconv  = require('iconv').Iconv;
let db = new sqlite3.Database('foodlist.db');
const parse = require("node-html-parser").parse;
var cron = require('node-cron');
/*var valid = cron.validate('59 * * * *');
var invalid = cron.validate('60 * * * *');*/
/*cron.schedule('1 *  * * *', () => {
  getData();
 
});
*/

function getData() {
    // console.log("Started Update On Food");

    fetch(
      "https://www.optimaedu.fi/svenska/for-studerande/studieguiden/lunchmeny-/-lounasmenu.html",
      {
        method: "get"
      }
    )
      .then(res => res.text())

      .then(body => parseHTML(body))

      .catch(err => {
        console.error(err);
      }); 
  }
getData();
function parseHTML(body) {
    const root = parse(body);
    const mainText = root.querySelector(".mainText");
    
    const arr = [];
    mainText.querySelectorAll("p").forEach((element, index) => {
      if (index > 1) arr.push(element.innerHTML);
    });
    const date = mainText
      .querySelector("h3")
      .innerHTML.split("<br />")[0]
      .match(/(\d{1,2}\.)?\d{1,2}-\d{1,2}.\d{1,2}.\d{4}/)[0];

    return combineData(arr, date);
  }
 
  function combineData(foodList, date) {
    // const day = parseInt(date.split("-")[0]) - 1;
    // const dateSplit = date.split(".");
    // const monthSplit = dateSplit[1].split("-");
    // const month = parseInt(monthSplit[0]) - monthSplit[1] == null ? 1 : 2;

    // const year = dateSplit[2];

    // let d = new Date(year, month, day, 0, 0, 0, 0);
    let d = dateCheck(date);
    // console.log("datenow", date);
    let result;
    // console.log(d.toUTCString());
   console.log(foodList);
    const finalList = foodList.map(food => {
      const splitted = food.split("<br />");
      // console.log( " splited "+splitted.length);
      if(splitted.length <=2 ){

      result = {
        date: new Date(d.getTime()),
        sv: splitted[0],
        fi: splitted[1]
      };
      
    }
    else{
      result = {
        date: new Date(d.getTime()),
        sv: splitted[0]+ " & " + splitted[1],
        fi: splitted[2] + " & " + splitted[3]
      };
      // console.log("result: "+result.fi)
      
    }
     
     return result;
  }
  
    );
    console.log(result);
    var test1= new Date();
    var test2 = test1.getDay() -1;

var year=test1.getFullYear();
var month =test1.getMonth()+1;
var day =test1.getDate();
if(day<10){day="0"+day}
  //   var x =finalList[test2].sv;
  //  console.log(x)
var datum= `${year}-${month}-${day}`;
console.log(datum)

//var sql= `INSERT INTO todaysfood(svfood,fifood,date) VALUES('${finalList[test2].sv}','${finalList[test2].fi}',"${datum}")`;

var sqldate= `SELECT COUNT(*) AS antal,id FROM todaysfood WHERE date = '${datum}'`
db.get(sqldate, [], (err, row) => {
  console.log(sqldate +" " + row);
  if(!row.antal){

  

  var sql= `INSERT INTO todaysfood(svfood,fifood,date) VALUES(?,?,?)`;
  var params = [finalList[test2].sv, finalList[test2].fi,datum];
     db.run(sql, params, function(err){
      if(err){
        console.log(err);
      }
  
  
    });
  }else{
    var sqlupd = `UPDATE todaysfood
    SET svfood = '${finalList[test2].sv}',
        fifood = '${finalList[test2].fi}'
    WHERE id = ${row.id} `
    db.run(sqlupd, params, function(err){
      if(err){
        console.log(err);
      }
    })
  }
  	

});


console.log(test1+" TEST1 "+test2 + " TEST2")
console.log(finalList[test2])
  
   return finalList[test2].sv
    // console.log(finalList);
  }
 
  function dateCheck(date) {
    const day = parseInt(date.split("-")[0]) - 0; //1
    const dateSplit = date.split(".");
    const monthSplit = dateSplit[1].split("-");
    const month = parseInt(monthSplit[0]) - (monthSplit[1] == null ? 1 : 1);

    const year = dateSplit[dateSplit.length - 1];

    const d = new Date(year, month, day, 0, 0, 0, 0);
    if (d.getDay() == 1) return d;
    return d.addDays(d.getDay() - 1);
  }
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
/*setInterval(getData,10)
*/


function getFoodFromDb(datum){

    var test1= new Date();
    var test2 = test1.getDay() -1;
    
    /*var datum= `${test1.getFullYear()}-${test1.getMonth()+1}-${test1.getDate()}`;*/
    var sqldate= `SELECT * FROM todaysfood WHERE date = '${datum}'`
    var params=[];
    var hello =0;
console.log(sqldate);
    db.get(sqldate,params,(err, row)=> {
      console.log(row)
      if(err){

        console.log(err)

      }
     
    /*if(row.id){return true}else{return false}
      */
   
    })
    
}

