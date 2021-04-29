var bajaj = require("../data/bajaj.json");
var final = require("../01 godigit - dhfl/final.json");
var fs = require("fs");

console.log("final", final.length);
console.log("bajaj", bajaj.length);

var bajaj2 = Object.assign([], bajaj);

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

  if (first.length === second.length) {
    let c = 0;

    first.forEach((a) => {
      second.forEach((b) => {
        if (a === b || a.includes(b) /*  || a.includes(b) */) {
          c = c + 1;
        }
      });
    });

    if (c === first.length) {
      return "same";
    }
  } else if (first.length < 2 || second.length < 2) {
    first.forEach((a) => {
      second.forEach((b) => {
        if (a === b || a.includes(b) /*  || a.includes(b) */) {
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
        if (a === b || a.includes(b) /* || a.includes(b) */) {
          c = c + 1;
        }
      });
    });

    if (first.length === 2) {
      if (c >= 2) {
        return "same";
      } else {
        return "not same";
      }
    } else {
      if (c >= 3) {
        return "same";
      } else {
        return "not same";
      }
    }
  }
}

function checkModel(first, second, third) {
  if (first.includes(second)) return "same";
  else return "not same";
}

function removeSpecialCharacters(value) {
  return value.toString().replace("-", " ");
}

console.log("Checking for GODIGIT AND DHFL");
console.log("final.json", final.length);

final.forEach((fin, finindex) => {
  bajaj.forEach((baj, index) => {
    if (fin.hasOwnProperty("godigit") && fin.hasOwnProperty("dhfl")) {
      fin.godigit["Make"] = removeSpecialCharacters(fin.godigit["Make"]);
      baj["vehiclemake"] = removeSpecialCharacters(baj["vehiclemake"]);
      if (
        fin.godigit["Make"].toLowerCase().trim() ===
          baj["vehiclemake"].toLowerCase().trim() &&
        checkModel(
          fin.godigit["Model"].toString().toLowerCase().trim(),
          baj["vehiclemodel"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariant(fin.godigit["Variant"], baj["vehiclesubtype"]) === "same"
      ) {
        bajaj2.splice(index, 1);

        final[finindex] = {
          ...final[finindex],
          bajaj: baj,
        };
      }
    }
  });

  bajaj = Object.assign([], bajaj2);
});

console.log("bajaj unique", bajaj2.length);
console.log("final.json", final.length);

console.log("checking only for GODIGIT");

bajaj = bajaj2;

final.forEach((fin, finindex) => {
  bajaj.forEach((baj, index) => {
    if (fin.hasOwnProperty("godigit") && !fin.hasOwnProperty("dhfl")) {
      fin.godigit["Make"] = removeSpecialCharacters(fin.godigit["Make"]);
      baj["vehiclemake"] = removeSpecialCharacters(baj["vehiclemake"]);
      if (
        fin.godigit["Make"].toLowerCase().trim() ===
          baj["vehiclemake"].toLowerCase().trim() &&
        checkModel(
          fin.godigit["Model"].toString().toLowerCase().trim(),
          baj["vehiclemodel"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariant(fin.godigit["Variant"], baj["vehiclesubtype"]) === "same"
      ) {
        bajaj2.splice(index, 1);

        final[finindex] = {
          ...final[finindex],
          bajaj: baj,
        };
      }
    }
  });

  bajaj = Object.assign([], bajaj2);
});

console.log("bajaj unique", bajaj2.length);
console.log("final.json", final.length);
console.log("checking only for DHFL");

bajaj = bajaj2;

final.forEach((fin, finindex) => {
  bajaj.forEach((baj, index) => {
    // checking only for dhfl
    if (fin.hasOwnProperty("dhfl") && !fin.hasOwnProperty("godigit")) {
      fin.dhfl["make_desc"] = removeSpecialCharacters(fin.dhfl["make_desc"]);

      baj["vehiclemake"] = removeSpecialCharacters(baj["vehiclemake"]);
      if (
        fin.dhfl["make_desc"].toLowerCase().trim() ===
          baj["vehiclemake"].toLowerCase().trim() &&
        checkModel(
          fin.dhfl["model_desc"].toString().toLowerCase().trim(),
          baj["vehiclemodel"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariant(fin.dhfl["variant_desc"], baj["vehiclesubtype"]) === "same"
      ) {
        bajaj2.splice(index, 1);

        final[finindex] = {
          ...final[finindex],
          bajaj: baj,
        };
      }
    }
  });

  bajaj = Object.assign([], bajaj2);
});

console.log("bajaj unique", bajaj2.length);
console.log("final.json", final.length);

let commonArray = [],
  commonObj = {};

commonArray = final;

bajaj2.forEach((m) => {
  commonObj = {
    bajaj: m,
  };

  commonArray.push(commonObj);
});

fs.writeFile(
  "godigit-dhfl-bajaj.json",
  JSON.stringify(commonArray, null, 2),
  function (err) {
    if (err) throw err;
    console.log("final json written");
  }
);
