var common = require("./common.json");
var dhflUnique = require("./dhfl unique.json");
var godigitUnique = require("./godigit unique.json");

var fs = require("fs");

console.log("dhflUnique", dhflUnique.length);
console.log("godigitUnique", godigitUnique.length);
console.log("common", common.length);

let commonArray = [],
  commonObj = {};

commonArray = common;

console.log("commonArray", commonArray.length);

godigitUnique.forEach((m) => {
  commonObj = {
    godigit: m,
  };

  commonArray.push(commonObj);
});

dhflUnique.forEach((m) => {
  commonObj = {
    dhfl: m,
  };

  commonArray.push(commonObj);
});

console.log("commonArray", commonArray.length);

fs.writeFile("./01 godigit - dhfl/final.json", JSON.stringify(commonArray, null, 2), function (err) {
  if (err) throw err;
  console.log("common array written into final");
});
