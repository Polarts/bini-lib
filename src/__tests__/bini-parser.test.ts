import fs from "fs";
import path from "path";
import { IniFile } from "../IniFIle";

const BINI_SRC = path.join(__dirname, "./__source__/br01-bin.ini");
const BINI_DST = path.join(__dirname, "./__expected__/br01-bin.ini");

const STR_SRC = path.join(__dirname, "./__source__/br01-string.ini");
const STR_DST = path.join(__dirname, "./__expected__/br01-string.ini");

describe('Bini parser', () => {

    it('parses br01-bin.ini from the original game', () => {
        const fileBytes = fs.readFileSync(BINI_SRC);
        const iniFile = IniFile.fromBinary(BINI_SRC, fileBytes);
        const expectedString = fs.readFileSync(BINI_DST, "utf-8");
        expect(iniFile.toString()).toEqual(expectedString);
    });

    it('parses br01-string.ini from Discovery Freelancer', () => {
        const fileText = fs.readFileSync(STR_SRC, "utf-8");
        const iniFile = IniFile.fromString(STR_SRC, fileText);
        const expectedString = fs.readFileSync(STR_DST, "utf-8");
        expect(iniFile.toString()).toEqual(expectedString);
    })
})