var motors = require("./motor_makemodel.json"); // tata
const vehicles = require("./VehicleMasterjan21.json"); // godigit
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

console.log(typeof motors[0]["make_desc"]);

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

function removeSpecialCharacters(value) {
  return value.toString().replace("-", " ");
}

let rich = 0;

let vehicles2 = Object.assign([], vehicles);
var motors2 = Object.assign([], motors);

vehicles.forEach((vehicle, vehicleindex) => {
  motors.forEach((motor, index) => {
    vehicle["Make"] = removeSpecialCharacters(vehicle["Make"]);

    motor["model_desc"] = removeSpecialCharacters(motor["model_desc"]);

    if (
      motor["variant_desc"] === "XE PETROL" &&
      motor["make_desc"] === "NISSAN" &&
      vehicle["Variant"] === "MICRA XE PETROL"
    ) {
      console.log(motor);
      console.log(vehicle);
      /* console.log(removeSpecialCharacters(motor["model_desc"])); */
      console.log(
        "here checking",
        checkVariant(vehicle["Variant"], motor["variant_desc"])
      );
    }

    if (
      vehicle["Make"]
        .toLowerCase()
        .trim()
        .includes(motor["make_desc"].toLowerCase().trim()) &&
      vehicle["Model"]
        .toString()
        .toLowerCase()
        .trim()
        .includes(motor["model_desc"].toString().toLowerCase().trim()) &&
      checkVariant(vehicle["Variant"], motor["variant_desc"]) === "same"
    ) {
      rich = rich + 1;
      /* console.log("common nos", rich); */
      results.push(motor);
      motors2.splice(index, 1);
      /* vehicles2.splice(vehicleindex, 1); */
    }
  });

  motors = Object.assign([], motors2);
});

fs.writeFile("common.json", JSON.stringify(results, null, 2), function (err) {
  if (err) throw err;
  console.log("complete");
});

/* fs.writeFile("motorcommon.json", JSON.stringify(motors, null, 2), function (err) {
  if (err) throw err;
  console.log("complete");
});

fs.writeFile("vehiclecommon.json", JSON.stringify(vehicles, null, 2), function (err) {
  if (err) throw err;
  console.log("complete");
}); */

console.log("common", results.length);
