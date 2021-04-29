var tata = require("../data/tata.json");
var final = require("../02 godigit-dhfl-bajaj/godigit-dhfl-bajaj.json");
var fs = require("fs");

console.log("final", final.length);
console.log("tata", tata.length);

var tata2 = Object.assign([], tata);

function checkVariant(first, second) {
  if (second === undefined) {
    return "not same";
  }
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

function checkVariantBajaj(first, second) {
  if (first === undefined || second === undefined) {
    return "not same";
  }

  if (second.includes(first)) {
    return "same";
  } else return "not same";
}

function checkModel(first, second) {
  if (first.includes(second)) return "same";
  else return "not same";
}

function removeSpecialCharacters(value) {
  return value.toString().replace("-", " ");
}

console.log(
  "Checking for GODIGIT DHFL BAJAJ, GODIGIT AND DHFL, GODIGIT AND BAJAJ, GODIGIT"
);
console.log("final.json", final.length);

final.forEach((fin, finindex) => {
  tata.forEach((tat, index) => {
    if (fin.hasOwnProperty("godigit")) {
      fin.godigit["Make"] = removeSpecialCharacters(fin.godigit["Make"]);
      tat["MANUFACTURER"] = removeSpecialCharacters(tat["MANUFACTURER"]);
      if (
        fin.godigit["Make"].toLowerCase().trim() ===
          tat["MANUFACTURER"].toLowerCase().trim() &&
        checkModel(
          fin.godigit["Model"].toString().toLowerCase().trim(),
          tat["VEHICLEMODEL"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariant(fin.godigit["Variant"], tat["TXT_VARIANT"]) === "same"
      ) {
        tata2.splice(index, 1);

        final[finindex] = {
          ...final[finindex],
          tata: tat,
        };
      }
    }
  });

  tata = Object.assign([], tata2);
});

console.log("tata unique", tata2.length);
console.log("final.json", final.length);
tata = tata2;

console.log("Checking for DHFL AND BAJAJ, DHFL");

final.forEach((fin, finindex) => {
  tata.forEach((tat, index) => {
    if (
      (fin.hasOwnProperty("dhfl") && fin.hasOwnProperty("bajaj")) ||
      (fin.hasOwnProperty("dhfl") &&
        !fin.hasOwnProperty("godigit") &&
        !fin.hasOwnProperty("bajaj"))
    ) {
      fin.dhfl["make_desc"] = removeSpecialCharacters(fin.dhfl["make_desc"]);
      tat["MANUFACTURER"] = removeSpecialCharacters(tat["MANUFACTURER"]);
      if (
        fin.dhfl["make_desc"].toLowerCase().trim() ===
          tat["MANUFACTURER"].toLowerCase().trim() &&
        checkModel(
          fin.dhfl["model_desc"].toString().toLowerCase().trim(),
          tat["VEHICLEMODEL"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariant(fin.dhfl["variant_desc"], tat["TXT_VARIANT"]) === "same"
      ) {
        tata2.splice(index, 1);

        final[finindex] = {
          ...final[finindex],
          tata: tat,
        };
      }
    }
  });

  tata = Object.assign([], tata2);
});

console.log("tata unique", tata2.length);
console.log("final.json", final.length);
tata = tata2;
console.log("Checking for only BAJAJ");

final.forEach((fin, finindex) => {
  tata.forEach((tat, index) => {
    if (
      fin.hasOwnProperty("bajaj") &&
      !fin.hasOwnProperty("godigit") &&
      !fin.hasOwnProperty("dhfl")
    ) {
      fin.bajaj["vehiclemake"] = removeSpecialCharacters(
        fin.bajaj["vehiclemake"]
      );
      tat["MANUFACTURER"] = removeSpecialCharacters(tat["MANUFACTURER"]);
      if (
        fin.bajaj["vehiclemake"].toLowerCase().trim() ===
          tat["MANUFACTURER"].toLowerCase().trim() &&
        checkModel(
          fin.bajaj["vehiclemodel"].toString().toLowerCase().trim(),
          tat["VEHICLEMODEL"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariantBajaj(fin.bajaj["vehiclesubtype"], tat["TXT_VARIANT"]) ===
          "same"
      ) {
        tata2.splice(index, 1);

        final[finindex] = {
          ...final[finindex],
          tata: tat,
        };
      }
    }
  });

  tata = Object.assign([], tata2);
});

console.log("tata unique", tata2.length);
console.log("final.json", final.length);

let commonArray = [],
  commonObj = {};

commonArray = final;

tata2.forEach((m) => {
  commonObj = {
    tata: m,
  };

  commonArray.push(commonObj);
});

console.log(commonArray.length);

fs.writeFile(
  "godigit-dhfl-bajaj-tata.json",
  JSON.stringify(commonArray, null, 2),
  function (err) {
    if (err) throw err;
    console.log("final json written");
  }
);
