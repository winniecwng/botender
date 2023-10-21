"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
// import OpenAI from "openai";

import { FormControl, Select, MenuItem } from "@mui/material";

export type DrinkType = "mocktail(s)" | "cocktail(s)";
export type Ingredients = string[];

export default function Home() {
  const [num, setNum] = useState(1);
  const [drink, setDrink] = useState<DrinkType>("cocktail(s)");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState<Ingredients>([]);

  const { messages, handleSubmit, setInput } = useChat();

  const addIngredient = () => {
    if (newIngredient && !ingredientsList.includes(newIngredient)) {
      setIngredientsList([...ingredientsList, newIngredient]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    const updatedIngredients = ingredientsList.filter((t) => t !== ingredient);
    setIngredientsList(updatedIngredients);
  };

  useEffect(() => {
    const list = ingredientsList.join(", ");
    const newInput = `Give me ${num} ${drink} recipe(s) that I can make with some or all of the ingredients: ${list}`;
    console.log("input", newInput);
    setInput(newInput);
  }, [num, drink, ingredientsList]);

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
    <div className="flex text-white">
      <main>
        <h1>What can I get for you?</h1>
        <div>
          I'd like {displayNumInput} {drink} recipes with the following
          ingredient(s):
        </div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Add ingredient"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addIngredient()}
            />
            {/* <button onClick={addIngredient}>Add</button> */}
            {/* </div> */}
            {/* <div> */}
            <span>
              {ingredientsList.map((ingredient) => (
                <span key={ingredient}>
                  <span>{ingredient}</span>{" "}
                  <button onClick={() => removeIngredient(ingredient)}>
                    x
                  </button>
                </span>
              ))}
            </span>
          </div>
        </div>
        <form onSubmit={onHandleSubmit}>
          <button type="submit">Create</button>
        </form>
      </main>
      <div className="border border-white bg-black text-white opacity-80">
        {messages.length > 0
          ? messages
              .filter((m) => m.role === "assistant")
              .map((m) => (
                <div key={m.id} className="whitespace-pre-wrap opacity-100">
                  {m.content}
                </div>
              ))
          : null}
      </div>
    </div>
  );
}
