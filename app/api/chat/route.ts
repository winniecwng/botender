import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  console.log("hit");
  const { messages } = await req.json();
  // const { num, drink } = await req.json();
  // console.log("num: ", num, "and drink: ", drink);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    // messages: [
    //   {
    //     role: "user",
    //     content: `say: num = ${num} and drink = ${drink}`,
    //   },
    // ],
    messages: messages,
  });
  // console.log("response in its form: ", response);
  // console.log("HERE'S THE RESPONSE: ", response.choices[0]);

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
  // return;
}
