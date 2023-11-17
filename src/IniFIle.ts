import { BiniDataView } from "./BiniDataView";
import { IniComment, Entry, Section } from "./ini-parts";

export class IniFile {

    public sections: Section[] = [];
    public comments: IniComment[] = [];

    constructor(public filePath: string) { }

    public static fromString(filePath: string, content: string) {
        const ini = new IniFile(filePath);
        const lines = content.split(/\r?\n/);
        let currentSection: Section | null = null;
        for (const [index, line] of lines.entries()) {
            if (line) {
                const firstChar = line.charAt(0);
                switch (firstChar) {
                    case ';':
                        // Handle comment
                        if (currentSection) {
                            currentSection.comments.push({
                                lineNum: index,
                                content: line
                            });
                        } else {
                            ini.comments.push({
                                lineNum: index,
                                content: line
                            })
                        }
                        break;
                    case '[':
                        // Handle section
                        if (currentSection) {
                            ini.sections.push(currentSection);
                        }
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
        ini.sections.push(currentSection);
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
        const text = this.sections.join("\n\n").split(/\r?\n/);
        this.comments.forEach(c => {
            text.splice(c.lineNum, 0, c.content);
        })
        return text.join('\n');
    }
}