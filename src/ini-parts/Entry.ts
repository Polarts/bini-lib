import { BiniDataView } from "../BiniDataView";
import { BiniStringBlock } from "../BiniStringBlock";
import { IniValue, IniValueType } from "./IniValueType";

export class Entry {

    public filePath: string = "";
    public section: string = "";

    constructor(
        public name: string,
        public values: IniValue[]
    ) {}

    public static fromBini(
        filePath: string,
        reader: BiniDataView,
        stringBlock: BiniStringBlock,
        section: string
    ): Entry {
        const nameOffset = reader.getReverseInt16();
        
        const name = stringBlock.get(nameOffset);

        const valuesCount = reader.getBytes(1)[0];
        const values: IniValue[] = [];

        for (let i=0; i<valuesCount; i++) {
            const valueType = reader.getBytes(1)[0] as IniValueType;
            switch(valueType) {
                case IniValueType.Boolean:
                    const bool = reader.getBytes(1)[0];
                    values.push(bool);
                    break;
                case IniValueType.Int32:
                case IniValueType.Single: // single is 4 bytes and there's no difference in TS
                    const int = reader.getReverseInt32();
                    values.push(int);
                    break;
                case IniValueType.String:
                    const stringPos = reader.getReverseInt32();
                    const str = stringBlock.get(stringPos);
                    values.push(str);
                    break;
            }
        }

        const entry = new Entry(name, values);
        entry.name = name;
        entry.filePath = filePath;
        entry.section = section;
        return entry;
    }

    public toString() {
        return `${this.name} = ${this.values.join(', ')}`;
    }
}