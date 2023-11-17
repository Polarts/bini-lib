import { BiniDataView } from "../BiniDataView";
import { BiniStringBlock } from "../BiniStringBlock";
import { Entry } from "./Entry";
import { IniComment } from "./types";

export class Section {

    public filePath: string = "";
    public entries: Entry[] = [];
    public comments: IniComment[] = [];

    constructor(
        public name: string
    ) { }

    public static fromBini(
        filePath: string,
        reader: BiniDataView,
        stringBlock: BiniStringBlock
    ): Section {

        const nameOffset = reader.getReverseInt16();
        const section = new Section(stringBlock.get(nameOffset));
        section.filePath = filePath;

        const entriesCount = reader.getReverseInt16();
        for (let i = 0; i < entriesCount; i++) {
            section.entries.push(Entry.fromBini(filePath, reader, stringBlock, section.name));
        }

        return section;
    }

    public toString() {
        return `[${this.name}]\n${this.entries.join("\n")}${this.comments.length > 0 ? "\n" : ""}${this.comments.map(c => c.content).join("\n")}`;
    }

}