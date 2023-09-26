function generateStr(l) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  while (result.length < l) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateJson(id, size) {
  const res = { id };
  for (let x = 0; x < size; x++) {
    res["test_" + x] = generateStr(x + 1);
  }
  return res;
}

module.exports = {
  generateJson: generateJson,
};
