export class BiniStringBlock {
    private strings = new Map<number, string>();

    constructor(
        private block: string
    ) { }

    public get(offset: number): string {
        let s = this.strings.get(offset);
        if (!s) {
            s = this.block.substring(offset, this.block.indexOf("\0", offset) - offset);
            this.strings.set(offset, s);
        }
        return s;
    }
}