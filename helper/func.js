 function checkKeys(final) {
  final.forEach((element) => {
    if (element.hasOwnProperty("godigit")) godigitKey = godigitKey + 1;
  });

  final.forEach((element) => {
    if (element.hasOwnProperty("dhfl")) dhflkey = dhflkey + 1;
  });

  final.forEach((element) => {
    if (element.hasOwnProperty("bajaj")) bajajkey = bajajkey + 1;
  });

  console.log(godigitKey, dhflkey, bajajkey);
}


