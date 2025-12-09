import path from "path";
import fs from "fs/promises"; //its used for reading the file module

export async function getData() {
  try {
    const filepath = path.join("data", "data.json"); //here as the data.json file is inside the data folder,
    const content = await fs.readFile(filepath, "utf8"); //here we are using utf8 for reading in the string format otherwise it returns with buffer
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}
