
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
var datum= `${test1.getFullYear()}-${test1.getMonth()+1}-${test1.getDate()}`;
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
var date = y+"-"+m+"-"+da;
let sql = `SELECT * from namns where datum = '${date}'`;
//console.log(sql);

           db1.get(sql, [], (err, row) => {
                                 if (err) {
                                     //return console.log(err.message);
                                     res.json({"fel":"felkk"})
                                 }
            //console.log(row);
  res.json({"namn":row.namn})
            })
           //res.json(row)
          
          
             
                 
}); //app get 

 app.get('/picoftheday', (req, res) => res.send('Hello!World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
