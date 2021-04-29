var dhfl = require("../data/dhfl.json"); // dhfl motors
var godigit = require("../data/godigit.json"); // godigit vehicles

var fs = require("fs");
const path = require('path');

console.log("dhfl", dhfl.length);
console.log("godigit", godigit.length);

function checkVariant(first, second) {
  first = first.toString();
  second = second.toString();

  first = first.replace("(", "");
  first = first.replace(")", "");
  second = second.replace("(", "");
  second = second.replace(")", "");

  first = first.toString().toLowerCase();
  second = second.toString().toLowerCase();

  first = first.split(" ");
  second = second.split(" ");

  let c = 0;

  if (first.length < 2 || second.length < 2) {
    /* console.log(first, " , ", second); */
    first.forEach((a) => {
      second.forEach((b) => {
        /* console.log(a, b); */
        if (a === b || a.includes(b) || a.includes(b)) {
          c = c + 1;
        }
      });
    });

    if (c >= 1) {
      return "same";
    } else {
      return "not same";
    }
  } else {
    first.forEach((a) => {
      second.forEach((b) => {
        /* console.log(a, b); */
        if (a === b || a.includes(b)) {
          c = c + 1;
        }
      });
    });

    if (c >= 2) {
      return "same";
    } else {
      return "not same";
    }
  }
}

function checkModel(first, second, third) {
  if (second.toString().toLowerCase().trim() === "scooter") {
    if (
      first
        .toString()
        .toLowerCase()
        .trim()
        .includes(third.toString().toLowerCase().trim())
    ) {
      return "same";
    } else {
      return "not same";
    }
  } else {
    if (checkVariant(first, second) === "same") {
      return "same";
    } else return "not same";
  }
}

function removeSpecialCharacters(value) {
  return value.toString().replace("-", " ");
}

let godigit2 = Object.assign([], godigit);
var dhfl2 = Object.assign([], dhfl);

let commonArray = [],
  commonObj = {},
  rich = 0,
  results = [];

  godigit.forEach((godig, godigindex) => {
  dhfl.forEach((dhf, dhflindex) => {
    godig["Make"] = removeSpecialCharacters(godig["Make"]);

    dhf["model_desc"] = removeSpecialCharacters(dhf["model_desc"]);

    if (
      godig["Make"]
        .toLowerCase()
        .trim()
        .includes(dhf["make_desc"].toLowerCase().trim()) &&
      checkModel(
        godig["Model"],
        dhf["model_desc"],
        dhf["variant_desc"]
      ) === "same" &&
      checkVariant(godig["Variant"], dhf["variant_desc"]) === "same"
    ) {
      rich = rich + 1;
      /* console.log("common nos", rich); */
      results.push(dhf);
      dhfl2.splice(dhflindex, 1);
      godigit2.splice(godigindex, 1);

      commonObj = {
        dhfl: dhf,
        godigit: godig,
      };

      commonArray.push(commonObj);
    }
  });

  dhfl = Object.assign([], dhfl2);
});



console.log("godigit unique", godigit2.length);

fs.writeFile("godigit unique.json", JSON.stringify(godigit2, null, 2), function (err) {
  if (err) throw err;
  console.log("godigit2");
});


console.log("dhfl unique", dhfl2.length);

fs.writeFile("dhfl unique.json", JSON.stringify(dhfl2, null, 2), function (err) {
  if (err) throw err;
  console.log("dhfl2");
});


console.log("common", commonArray.length);

fs.writeFile(
  "common.json",
  JSON.stringify(commonArray, null, 2),
  function (err) {
    if (err) throw err;
    console.log("common array written");
  }
);

