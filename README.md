# Bini Lib

A library for dealing with the Freelancer (2003 game) Bini data files in the JS/TS ecosystem.

Based on [Librelancer.Ini](https://github.com/Librelancer/Librelancer/tree/main/src/LibreLancer.Data/Ini)

## Examples

### Reading an ini file from BINI
```typescript
const fileBytes = fs.readFileSync(FILE_PATH);
const iniFile = IniFile.fromBinary(FILE_PATH, fileBytes);
```

### Reading an ini file from string
```typescript
const fileText = fs.readFileSync(FILE_PATH, "utf-8");
const iniFile = IniFile.fromString(FILE_PATH, fileText);
```

## Iterating through the data
The data is stored in a nested structure, consisting of `sections` -> `entries` -> `values`.

The `IniFile` class stores an array of `Section`, each of which has an array of `Entry`, each of which has an array of `IniValue` (defined as `boolean | number | string`).

Here is a simple loop that iterates through all three levels:
```typescript
for (const section of iniFile.sections) {
    console.log(section.name);
    for (const entry of section.entries) {
        console.log(entry.name);
        for (const value of entry.values) {
            console.log(value);
        }
    }
}
```
