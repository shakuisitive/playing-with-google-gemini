require("dotenv").config();
let path = require("path");
let fs = require("fs");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const writeToLocalDb = require("./writeToLocalDb");

let dbPath = path.join(__dirname, "../db.json");
let { messages } = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [...messages],
  });
  let message = "do you know my name";
  writeToLocalDb({ agent: "user", text: message });
  const result = await chatSession.sendMessage(message);
  writeToLocalDb({ agent: "model", text: result.response.text() });

  console.log(result.response.text());
}

run();
