import { BiniDataView } from "./BiniDataView";
import { Entry, Section } from "./ini-parts";

export class IniFile {

    public sections: Section[] = [];

    constructor(public filePath: string) { }

    public static fromString(filePath: string, content: string) {
        const ini = new IniFile(filePath);
        const lines = content.split("\n");
        let currentSection: Section | null = null;
        for (const line of lines) {
            if (line) {
                const firstChar = line.charAt(0);
                switch (firstChar) {
                    case ';':
                        // Handle comment
                        break;
                    case '[':
                        // Handle section
                        const sectionName = /\[(.*?)\]/.exec(line)?.at(1) ?? 'Null';
                        currentSection = new Section(sectionName);
                        break;
                    default:
                        // Handle entry
                        if (currentSection) {
                            currentSection.entries.push(Entry.fromString(line));
                        }
                        break;
                }
            }
        }
        return ini;
    }

    public static fromBinary(filePath: string, content: ArrayBuffer) {
        const ini = new IniFile(filePath);
        const buf = new Uint8Array(content);
        const dataView = new BiniDataView(buf, filePath);
        const sections = dataView.readBiniFile(content.byteLength);
        if (sections) {
            ini.sections = sections;
        }
        return ini;
    }

    public toString() {
        return this.sections.join("\n\n");
    }
}