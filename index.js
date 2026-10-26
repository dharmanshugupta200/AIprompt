//code for the prompt to be asked and the response to be given by the AI in a loop until the user types "exit"
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import readline from "readline";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const chat = ai.chats.create({ model: "gemini-flash-latest" });

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function sendWithRetry(message, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await chat.sendMessage({ message });
    } catch (err) {
      if (err.status === 503 && i < retries - 1) {
        console.log(`⚠️ Server busy, retrying (${i + 1}/${retries})...`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

function ask() {
  rl.question("You: ", async (userInput) => {
    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      return rl.close();
    }

    try {
      const res = await sendWithRetry(userInput);
      console.log("AI:", res.text);
    } catch (err) {
      console.log("⚠️ Failed after retries:", err.message);
    }

    ask();
  });
}

console.log("Chat started! Type 'exit' to quit.\n");
ask();


//old code for storing the response and anser as per the same
/* import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const chat = ai.chats.create({ model: "gemini-flash-latest" });

  const reply1 = await chat.sendMessage({ message: "My name is Aryan." });
  console.log("AI:", reply1.text);

  const reply2 = await chat.sendMessage({ message: "What's my name?" });
  console.log("AI:", reply2.text);

  // console.log(JSON.stringify(chat.getHistory(), null, 2));
}

main(); */