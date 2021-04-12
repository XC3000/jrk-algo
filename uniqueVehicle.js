var motors = require("./common.json"); // tata
const vehicles = require("./VehicleMasterjan21.json"); // godigit
var fs = require("fs");

console.log(motors.length);
console.log(vehicles.length);

let rich = 0;

let vehicles2 = Object.assign([], vehicles);
var motors2 = Object.assign([], motors);

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
      /* vehicles2.splice(vehicleindex, 1); */
    }
  });

  motors = Object.assign([], motors2);
});

motors.forEach((motor) => {
  vehicles.forEach((vehicle, index) => {
    vehicle["Make"] = removeSpecialCharacters(vehicle["Make"]);

    motor["model_desc"] = removeSpecialCharacters(motor["model_desc"]);

    
  });
});
