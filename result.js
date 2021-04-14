var motors = require("./motors2.json"); // tata
const vehicles = require("./uncommonvehicle.json"); // godigit
const common = require("./commArr.json"); // godigit
var fs = require("fs");

console.log("motros", motors.length);
console.log("vehicles", vehicles.length);
console.log("common", common.length);

let commonArray = [],
  commonObj = {};

commonArray = common;

console.log("commonArray", commonArray.length);

motors.forEach((m) => {
  commonObj = {
    tata: m,
  };

  commonArray.push(commonObj);
});

vehicles.forEach((m) => {
    commonObj = {
        godigit: m,
    };
  
    commonArray.push(commonObj);
  });

console.log("commonArray", commonArray.length);


fs.writeFile("final.json", JSON.stringify(commonArray, null, 2), function (err) {
    if (err) throw err;
    console.log("common array written into final");
  });
  