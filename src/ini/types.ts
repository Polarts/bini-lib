export enum IniValueType {
    Boolean,
    Int32,
    Single,
    String
}

export type IniValue = boolean | number | string;

export interface IniComment {
    lineNum: number;
    content: string;
}