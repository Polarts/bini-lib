import { BiniDataView } from "./BiniDataView";
import { Section } from "./ini-parts";

export class IniFile {
    
    public sections: Section[] = [];

    constructor(public filePath: string) {}

    public static fromText(filePath: string, content: string) {
        const ini = new IniFile(filePath);
        const lines = content.split("\n");
        // TODO implement
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