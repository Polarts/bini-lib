export class BiniStringBlock {
    private strings = new Map<number, string>();

    constructor(
        private block: string
    ) { }

    public get(offset: number): string {
        let s = this.strings.get(offset);
        if (s === undefined) {
            const endIndex = this.block.indexOf("\0", offset);
            s = this.block.substring(offset, endIndex);
            this.strings.set(offset, s);
        }
        return s;
    }
}