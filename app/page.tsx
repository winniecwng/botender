"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
// import OpenAI from "openai";

import { FormControl, Select, MenuItem } from "@mui/material";

export type DrinkType = "mocktail(s)" | "cocktail(s)";

export default function Home() {
  const [num, setNum] = useState<number>(1);
  const [drink, setDrink] = useState<DrinkType>("cocktail(s)");

  const { messages, input, handleInputChange, handleSubmit, data, setInput } =
    useChat({
      body: {
        num,
        drink,
      },
    });

  useEffect(() => {
    const newInput = `Give me ${num} ${drink} recipe(s) that I can make with some or all of the ingredients: lemon, grenadine`;
    setInput(newInput);
  }, [num, drink]);

  // const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  // const openai = new OpenAI();
  const displayNumInput = (
    <FormControl>
      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
      <Select
        type="number"
        value={num}
        onChange={(e) => setNum(Number(e.target.value))}
        // sx={{ color: "white" }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  );

  const onHandleSubmit = (e: any) => {
    handleSubmit(e);
  };

  return (
    <div className="">
      <main className="border border-2 bg-white">
        <h1>What can I get for you?</h1>
        <div>
          I'd like {displayNumInput} {drink} recipes with the following
          ingredient(s):
        </div>
        <form onSubmit={onHandleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </main>
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        : null}
    </div>
  );
}
