import { BiniDataView } from "./src/BiniDataView";
import fs from "fs";

const args = process.argv.slice(2);
const filePath = args[0];

const fileBytes = fs.readFileSync(filePath);

const bini = new BiniDataView(new Uint8Array(fileBytes));
const result = bini.readBiniFile(fileBytes.length);
fs.writeFileSync("result.ini", result?.join('\n\n') ?? '');
