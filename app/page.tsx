"use client";

import { useState } from "react";
// import { useChat } from "ai/react";
import barBG from "../public/barBG.jpg";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export type DrinkType = "mocktail(s)" | "cocktail(s)";

export default function Home() {
  const [num, setNum] = useState<number>(1);
  const [drink, setDrink] = useState<DrinkType>("cocktail(s)");

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

  return (
    <div className="">
      <main className="border border-2 bg-white">
        <h1>What can I get for you?</h1>
        <div>
          I'd like {displayNumInput} {drink} recipes with the following
          ingredient(s):
        </div>
        <Button variant="contained" sx={{ color: "black" }}>
          Cheers! {">>"}
        </Button>
      </main>
    </div>
  );
}
