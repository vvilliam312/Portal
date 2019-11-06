const parse = require("node-html-parser").parse;
const fetch = require("node-fetch");

function getFoodFromDb(){
	
	
}




	const url = "https://www.optimaedu.fi/svenska/for-studerande/studieguiden/lunchmeny-/-lounasmenu.html";

const get_data = async url => {
  try {
    const response = await fetch(url);
    const json = await response.text();
    handleData(json);
  } catch (error) {
    console.log(error);
  }
};

function handleData(body){
 console.log(body);
 
}

get_data(url);
console.log("SLut")
