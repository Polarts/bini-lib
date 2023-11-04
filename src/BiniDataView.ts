import jDataView from "jdataview";
import { BiniStringBlock } from "./BiniStringBlock";
import { Section } from "./ini-parts/Section";
import fs from "fs";

export class BiniDataView extends jDataView {
    getReverseInt32(): number {
        const reverseBytes = this.getBytes(4).reverse();
        return new jDataView(reverseBytes).getInt32();
    }

    getReverseInt16(): number {
        const reverseBytes = this.getBytes(2).reverse();
        return new jDataView(reverseBytes).getInt16();
    }

    /**
     * Reads the BINI file this data view is currently viewing.
     * @param byteLength the byteLength of the array passed in the ctor.
     */
    readBiniFile(byteLength: number): Section[] | null {

        // const retVal: INIStruct[] = [];
        const fileTag = this.getString(4);
        const version = this.getReverseInt32();

        // Check if it's really a bini file
        if (fileTag === "BINI" && version === 1) {

            const stringBlockOffset = this.getReverseInt32();
            
            if (stringBlockOffset > byteLength) throw "The string block offset was out of range: " + stringBlockOffset;

            const sectionBlockOffset = this.tell();
            this.seek(stringBlockOffset);
            const stringBlockOffsetLength = byteLength - stringBlockOffset;
            const strings = this.getString(stringBlockOffsetLength);
            const stringBlock = new BiniStringBlock(strings);
            fs.writeFileSync("stringBlock.txt", strings)

            this.seek(sectionBlockOffset);
            
            const sections: Section[] = [];

            while (this.tell() < stringBlockOffset) {
                sections.push(Section.fromBini("", this, stringBlock))
            }
            
            return sections;
        } 
        
        return null;
    }
}