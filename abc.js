var motors = require("./motor_makemodel.json"); // tata
const vehicles = require("./VehicleMasterjan21.json"); // godigit
var bajaj = require("./bagiccars.json"); // godigit
var fs = require("fs");

/* for (let i = 0; i < vehicle.length; i++) {
  for (let j = 0; j < motor.length; j++) {
      if() {}
  }
} */

/* motor.forEach((moto) => {
  if (
    moto["make_desc"].toLowerCase().trim() === "aston martin" &&
    moto["model_desc"].toLowerCase().trim() === "dbs"
  ) {
    console.log(moto);
  }
}); */

/* common 1571 */

console.log("motors", motors.length);
console.log("vehicles", vehicles.length);
console.log("bajaj", bajaj.length);

let results = [];

/* motors.forEach((motor) => {
  console.log(motor);
  console.log(typeof motor["variant_desc"]);
  console.log(motor["variant_desc"].toLowerCase().trim());
}); */

/* motors.forEach((motor) => {
  vehicles.forEach((vehicle, index) => {
    if (
      vehicle["Make"]
        .toLowerCase()
        .trim()
        .includes(motor["make_desc"].toLowerCase().trim()) &&
      toString(vehicle["Model"]).toLowerCase().trim() ===
        toString(motor["model_desc"]).toLowerCase().trim() &&
      toString(vehicle["Variant"])
        .toLowerCase()
        .trim()
        .includes(toString(motor["variant_desc"]).toLowerCase().trim()) &&
      vehicle["Body Type"].toLowerCase().trim() ===
        motor["segment_desc"].toLowerCase().trim()
    ) {
      results.push(vehicle);
      vehicles.splice(index, 1);
    }
  });
}); */

function checkVariant(first, second) {
  /* let first = "COMFORTLINE 1.5L AT (D)";

  let second = "1.5 TDI Comfortline (AT)"; */

  // vehice

  // motor

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

let vehicles2 = Object.assign([], vehicles);
var motors2 = Object.assign([], motors);
var bajaj2 = Object.assign([], bajaj);

let commonArray = [],
  commonObj = {};

vehicles.forEach((vehicle, vehicleindex) => {
  bajaj.forEach((baj, index) => {
    vehicle["Make"] = removeSpecialCharacters(vehicle["Make"]);

    baj["vehiclemake"] = removeSpecialCharacters(baj["vehiclemake"]);
    if (
      vehicle["Make"].toLowerCase().trim() ===
        baj["vehiclemake"].toLowerCase().trim() &&
      checkModel(
        vehicle["Model"].toString().toLowerCase().trim(),
        baj["vehiclemodel"].toString().toLowerCase().trim()
      ) === "same" &&
      /* &&
      checkModel(vehicle["Model"], baj["vehiclemodel"], baj["vehiclemodel"]) ===
        "same" */
      checkVariant(vehicle["Variant"], baj["vehiclesubtype"]) === "same"
    ) {
      /* console.log("common nos", rich); */
      results.push(baj);
      bajaj2.splice(index, 1);
      vehicles2.splice(vehicleindex, 1);

      commonObj = {
        //tata: motor,
        bajaj: baj,
        godigit: vehicle,
      };

      commonArray.push(commonObj);
    }
  });

  bajaj = Object.assign([], bajaj2);
});

fs.writeFile(
  "commbajaj.json",
  JSON.stringify(commonArray, null, 2),
  function (err) {
    if (err) throw err;
    console.log("complete");
  }
);

fs.writeFile(
  "uncommbajaj.json",
  JSON.stringify(bajaj2, null, 2),
  function (err) {
    if (err) throw err;
    console.log("complete uncommon");
  }
);

// console.log("uncommon godigit motors", motors2.length);
console.log("uncommon godigit motors", bajaj.length);

console.log("common", results.length);

console.log("common in both", commonArray.length);

console.log("uncommon tata vehicle", vehicles2.length);
