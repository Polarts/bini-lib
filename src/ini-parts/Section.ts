import { BiniDataView } from "../BiniDataView";
import { BiniStringBlock } from "../BiniStringBlock";
import { Entry } from "./Entry";

export class Section {

    public filePath: string;

    private entries: Entry[] = [];

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
        for (let i=0; i<entriesCount; i++) {
            section.entries.push(Entry.fromBini(filePath, reader, stringBlock, section.name));
        }

        return section;
    }

}