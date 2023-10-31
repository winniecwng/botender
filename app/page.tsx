"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
// import OpenAI from "openai";

// import { FormControl, Select, MenuItem } from "@mui/material";

export type DrinkType = "mocktail" | "cocktail";
export type Ingredients = string[];

// font family for logo: https://fonts.google.com/specimen/Style+Script
const options = [1, 2, 3, 4, 5];
const drinkOptions = ["mocktail", "cocktail"];

export default function Home() {
  const [num, setNum] = useState(1);
  const [drink, setDrink] = useState<DrinkType>("cocktail");
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
    const newInput = `Give me ${num} ${drink} recipes that I can make with some or all of the ingredients: ${list}. Return the response with only the recipe name, ingredients and instructions`;

    setInput(newInput);
  }, [num, drink, ingredientsList]);

  const displayNumInput = (
    <select
      onChange={(e) => setNum(Number(e.target.value))}
      className="text-black w-min h-8 px-2"
    >
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );

  const onHandleSubmit = (e: any) => {
    handleSubmit(e);
  };

  const displayDrinkInput = (
    <select
      onChange={(e) => setDrink(e.target.value as DrinkType)}
      className="text-black w-min h-8 px-2"
    >
      {drinkOptions.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );

  return (
    <div className="border-4 border-sky-500 flex items-center justify-center w-1/2 text-center my-12">
      <div className="text-white">
        <main className="flex flex-col gap-6">
          <h1>What can I get for you?</h1>
          <div>
            I'd like {displayNumInput} {displayDrinkInput} recipe{"("}s{")"}{" "}
            with the following ingredient(s):
          </div>

          <div className="flex flex-col gap-4 items-center">
            <div className="w-full flex gap-4 justify-center">
              <input
                type="text"
                className="text-black w-1/4 pl-2"
                placeholder="Add ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIngredient()}
              />
              <div
                className="border border-white rounded-lg py-1 px-4 cursor-pointer"
                onClick={addIngredient}
              >
                Add
              </div>
            </div>

            <div className="flex flex-wrap gap-5 border-2 border-sky-500 w-1/2 justify-center">
              {ingredientsList.map((ingredient) => (
                <span
                  key={ingredient}
                  className=" flex gap-3 border border-white py-1 px-4 rounded-full"
                >
                  <span>{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="cursor-pointer"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={onHandleSubmit}>
            <button
              type="submit"
              className="border border-white rounded-lg py-1 px-4"
            >
              Create
            </button>
          </form>
        </main>
        <div className="border border-white text-white mt-6">
          <div className="">
            {messages.length > 0
              ? messages
                  .filter((m) => m.role === "assistant")
                  .map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap">
                      {m.content}
                    </div>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
