let fs = require("fs");
let path = require("path");
let dbPath = path.join(__dirname, "../db.json");
let data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

function writeToLocalDb({ agent, text }) {
  data.messages.push({ role: agent, parts: [{ text: text }] });
  console.log(data);
  let updatedData = JSON.stringify(data);
  fs.rmSync(dbPath);
  fs.writeFileSync(dbPath, updatedData);
}

module.exports = writeToLocalDb;
