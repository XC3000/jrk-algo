var motors = require("./motor_makemodel.json"); // tata
const vehicles = require("./VehicleMasterjan21.json"); // godigit
var bajaj = require("./bagiccars.json"); // bajaj

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

  //   vehice

  //   motor

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
        if (a === b || a.includes(b) || a.includes(b)) {
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
  // vehicle["Model"], // ZOOM
  // motor["model_desc"], // SCOOTER
  // motor["variant_desc"] // ZOOM

  if (second.toString().toLowerCase().trim() === "scooter")
    if (second.toString().toLowerCase().trim() === "scooter") {
      /* console.log(
      "second",
      first.toString().toLowerCase().trim(),
      third.toString().toLowerCase().trim(),
      first
        .toString()
        .toLowerCase()
        .trim()
        .includes(third.toString().toLowerCase().trim())
    ); */
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

let rich = 0;

let vehicles2 = Object.assign([], vehicles);
var motors2 = Object.assign([], motors);
var bajaj2 = Object.assign([], bajaj);

console.log(vehicles2[0], motors2[0], bajaj2[0]);

let commonArray = [],
  commonObj = {},
  currentIndex = -1;

vehicles.forEach((vehicle, vehicleindex) => {
  motors.forEach((motor, index) => {
    vehicle["Make"] = removeSpecialCharacters(vehicle["Make"]);

    motor["model_desc"] = removeSpecialCharacters(motor["model_desc"]);

    if (
      vehicle["Make"]
        .toLowerCase()
        .trim()
        .includes(motor["make_desc"].toLowerCase().trim()) &&
      checkModel(
        vehicle["Model"],
        motor["model_desc"],
        motor["variant_desc"]
      ) === "same" &&
      checkVariant(vehicle["Variant"], motor["variant_desc"]) === "same"
    ) {
      rich = rich + 1;
      /* console.log("common nos", rich); */
      results.push(motor);
      motors2.splice(index, 1);
      // vehicles2.splice(vehicleindex, 1);

      commonObj = {
        tata: motor,
        godigit: vehicle,
      };

      // commonArray.push(commonObj);
    }
  });

  motors = Object.assign([], motors2);

  // checking of common bajaj ones

  // bajaj.forEach((baj, index) => {
  //   vehicle["Make"] = removeSpecialCharacters(vehicle["Make"]);

  //   baj["vehiclemodel"] = removeSpecialCharacters(baj["vehiclemodel"]);

  //   if (
  //     vehicle["Make"]
  //       .toLowerCase()
  //       .trim()
  //       .includes(baj["vehiclemake"].toLowerCase().trim()) &&
  //     checkModel(vehicle["Model"], baj["vehiclemodel"], baj["vehiclemodel"]) ===
  //       "same" &&
  //     checkVariant(vehicle["Variant"], baj["vehiclesubtype"]) === "same"
  //   ) {
  //     bajaj2.splice(index, 1);

  //     commonObj = {
  //       ...commonObj,
  //       bajaj: baj,
  //     };
  //   }
  // });
  console.log("outside");

  if (Object.keys(commonObj).length != 0) {
    console.log("adding");
    vehicles2.splice(vehicleindex, 1);
    commonArray.push(commonObj);
    commonObj = {};
  }

  bajaj = Object.assign([], bajaj2);
});

// fs.writeFile("common.json", JSON.stringify(results, null, 2), function (err) {
//   if (err) throw err;
//   console.log("complete");
// });

// fs.writeFile("motors.json", JSON.stringify(motors, null, 2), function (err) {
//   if (err) throw err;
//   console.log("complete");
// });

// fs.writeFile("motors2.json", JSON.stringify(motors2, null, 2), function (err) {
//   if (err) throw err;
//   console.log("complete");
// });

// fs.writeFile(
//   "uncommonvehicle.json",
//   JSON.stringify(vehicles2, null, 2),
//   function (err) {
//     if (err) throw err;
//     console.log("complete");
//   }
// );

/* fs.writeFile("motorcommon.json", JSON.stringify(motors, null, 2), function (err) {
  if (err) throw err;
  console.log("complete");
});

fs.writeFile("vehiclecommon.json", JSON.stringify(vehicles, null, 2), function (err) {
  if (err) throw err;
  console.log("complete");
}); */

console.log("final motors", motors2.length);

console.log("common", results.length);

console.log("final bajaj", bajaj2.length);

console.log(commonArray[0]);

console.log("commonobj", commonArray.length);

// fs.writeFile(
//   "commArr.json",
//   JSON.stringify(commonArray, null, 2),
//   function (err) {
//     if (err) throw err;
//     console.log("common array written");
//   }
// );

console.log("uncommon vehicle", vehicles2.length);
