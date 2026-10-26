import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

console.log("Starting...");

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-flash-latest",
});

console.log("Model created, calling invoke...");

async function main() {
  try {
    const response = await model.invoke("Say hello and tell me one fun fact about space.");
    console.log("Response:", response.content);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

main();