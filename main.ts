import { BiniDataView } from "./src/BiniDataView";
import fs from "fs";
import { IniFile } from "./src/IniFIle";

const args = process.argv.slice(2);
const filePath = args[0];

// const fileBytes = fs.readFileSync(filePath);

// fs.writeFileSync("result.ini", IniFile.fromBinary(filePath, fileBytes).toString());

const fileText = fs.readFileSync(filePath, "utf-8");
fs.writeFileSync("result.ini", IniFile.fromString(filePath, fileText).toString());