import { getData } from "./getData.js";
import path from "path";
import fs from "fs/promises";
export async function addNewSighting(newSighting) {
  try {
    let data = await getData();
    data.push(newSighting);
    const filepath = path.join("data", "data.json");
    await fs.writeFile(filepath, JSON.stringify(data), "utf-8"); //as the encoding is in utf-8, we are using json.stringify
  } catch (err) {
    throw new Error(`Error is ${err}`);
  }
}
