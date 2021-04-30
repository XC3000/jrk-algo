var bajaj = require("./bajaj.json");
var dhfl = require("./dhfl.json");
var godigit = require("./godigit.json");
var tata = require("./tata.json");

console.log("bajaj length", bajaj.length);
console.log("dhfl length", dhfl.length);
console.log("godigit length", godigit.length);
console.log("tata length", tata.length);

bajaj.forEach((baj) => {
  if (baj["vehiclesubtype"] === undefined) console.log(baj);
});


/* tata.forEach((baj) => {
    if (baj["TXT_VARIANT"] === undefined) console.log(baj);
  }); */