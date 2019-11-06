
const express = require('express')
const app = express()
const port = (3000);
const sqlite3 = require('sqlite3').verbose();
var bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));


let db = new sqlite3.Database('./todayfood/foodlist.db');
let db1 = new sqlite3.Database('./dayName/namn.db');
app.use(express.static('public'))



 app.get('/', (req, res) => res.send('Hello!World!'))


app.get('/mat', (req, res,next) => {
    var test1= new Date();
    var test2 = test1.getDay() -1;
    function zerofill(param){
	if(param<10){param="0"+param}
	return param	
}
var datum= `${test1.getFullYear()}-${zerofill(test1.getMonth()+1)}-${zerofill(test1.getDate())}`;
console.log(datum);
var sqldate= `SELECT * FROM todaysfood WHERE date = '${datum}'`
var params=[];

db.all(sqldate,params,(err, row)=> {
if(err){
    res.status(400).json({"error":err.message});
    console.log(err)

}
    res.json({
  "data": row,
    "message":"success"
     })    
  })
})

app.get('/getname', function (req, res) {
console.log('Hämtade namn');
//hämta dagens namn

var d = new Date();
var y=d.getFullYear();
var m=d.getMonth()+1;
var da=d.getDate();

console.log(m,da);
if(m<10){
  m="0"+m;
  }
if(da<10){
  da="0"+da;
  }   
  
var date = y+"-"+m+"-"+da;

  
console.log(date);
let sql = `SELECT * from namns where datum = '${date}'`;
console.log(sql);

           db1.get(sql, [], (err, row) => {
                                 if (err) {
                                     //return console.log(err.message);
                                     res.json({"fel":"fel"})
                                 }
            console.log(row);
  res.json({"namn":row.namn})
            })
           //res.json(row)
          
          
             
  
}); //app get 



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
