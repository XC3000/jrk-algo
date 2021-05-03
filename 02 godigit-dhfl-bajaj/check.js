var bajaj = require("../data/bajaj.json");
var final = require("../01 godigit - dhfl/final.json");

var fs = require("fs");

console.log("final", final.length);
console.log("bajaj", bajaj.length);

var bajaj2 = Object.assign([], bajaj);

function checkKeys(richard123) {
  var godigitKey = 0,
    dhflkey = 0,
    bajajkey = 0;

  richard123.forEach((element) => {
    if (element.hasOwnProperty("godigit")) godigitKey = godigitKey + 1;
  });

  richard123.forEach((element) => {
    if (element.hasOwnProperty("dhfl")) dhflkey = dhflkey + 1;
  });

  richard123.forEach((element) => {
    if (element.hasOwnProperty("bajaj")) bajajkey = bajajkey + 1;
  });

  console.log(godigitKey, dhflkey, bajajkey);
}

let rich = 0,
  mapped = 0;

checkKeys(final);

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

let temp = [],
  commobj = {},
  final2 = Object.assign([], final);

final.forEach((fin, finindex) => {
  bajaj.forEach((baj, index) => {
    if (fin.hasOwnProperty("godigit") /* && fin.hasOwnProperty("dhfl") */) {
      fin.godigit["Make"] = removeSpecialCharacters(fin.godigit["Make"]);
      baj["vehiclemake"] = removeSpecialCharacters(baj["vehiclemake"]);
      if (
        fin.godigit["Make"].toLowerCase().trim() === baj["vehiclemake"].toLowerCase().trim() &&
        checkModel(
          fin.godigit["Model"].toString().toLowerCase().trim(),
          baj["vehiclemodel"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariant(fin.godigit["Variant"], baj["vehiclesubtype"]) === "same"
      ) {
        commobj = {
          ...final[finindex],
          bajaj: baj,
        };
        temp.push(commobj);

        bajaj2.splice(index, 1);
        final2.splice(index, 1);
      }
    }
  });

  bajaj = Object.assign([], bajaj2);
});

console.log("bajaj unique", bajaj2.length);
// console.log("final2.json", final2.length);
// console.log("temp.json", temp.length);

final = [...final2, ...temp];

checkKeys(final);

// console.log(final.length);

// final.forEach((element) => {
//   if (element.hasOwnProperty("bajaj")) {
//     mapped = mapped + 1;
//   }
// });

// console.log(mapped);

// console.log("checking only for GODIGIT");

// console.log("final length", final.length);

// bajaj = bajaj2;

// final.forEach((fin, finindex) => {
//   bajaj.forEach((baj, index) => {
//     if (fin.hasOwnProperty("godigit") && !fin.hasOwnProperty("dhfl")) {
//       fin.godigit["Make"] = removeSpecialCharacters(fin.godigit["Make"]);
//       baj["vehiclemake"] = removeSpecialCharacters(baj["vehiclemake"]);
//       if (
//         fin.godigit["Make"].toLowerCase().trim() ===
//           baj["vehiclemake"].toLowerCase().trim() &&
//         checkModel(
//           fin.godigit["Model"].toString().toLowerCase().trim(),
//           baj["vehiclemodel"].toString().toLowerCase().trim()
//         ) === "same" &&
//         checkVariant(fin.godigit["Variant"], baj["vehiclesubtype"]) === "same"
//       ) {
//         bajaj2.splice(index, 1);

//         final[finindex] = {
//           ...final[finindex],
//           bajaj: baj,
//         };
//       }
//     }
//   });

//   bajaj = Object.assign([], bajaj2);
// });
console.log("final length", final.length);
console.log("bajaj unique", bajaj2.length);
console.log("checking only for DHFL");

temp = [];
commobj = {};
final2 = final;

bajaj = bajaj2;

final.forEach((fin, finindex) => {
  bajaj.forEach((baj, index) => {
    // checking only for dhfl
    if (fin.hasOwnProperty("dhfl") && !fin.hasOwnProperty("godigit")) {
      fin.dhfl["make_desc"] = removeSpecialCharacters(fin.dhfl["make_desc"]);

      baj["vehiclemake"] = removeSpecialCharacters(baj["vehiclemake"]);
      if (
        fin.dhfl["make_desc"].toLowerCase().trim() === baj["vehiclemake"].toLowerCase().trim() &&
        checkModel(
          fin.dhfl["model_desc"].toString().toLowerCase().trim(),
          baj["vehiclemodel"].toString().toLowerCase().trim()
        ) === "same" &&
        checkVariant(fin.dhfl["variant_desc"], baj["vehiclesubtype"]) === "same"
      ) {
        commobj = {
          ...final[finindex],
          bajaj: baj,
        };
        temp.push(commobj);

        bajaj2.splice(index, 1);
        final2.splice(index, 1);
      }
    }
  });

  bajaj = Object.assign([], bajaj2);
});

bajaj = bajaj2;
final = [...final2, ...temp];

checkKeys(final);
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

checkKeys(commonArray);

fs.writeFile("./02 godigit-dhfl-bajaj/godigit-dhfl-bajaj.json", JSON.stringify(commonArray, null, 2), function (err) {
  if (err) throw err;
  console.log("final json written");
});
