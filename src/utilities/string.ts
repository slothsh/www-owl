export function replaceSubstring(str: string, start: number, end: number, replacement: string): string {
    let before = str.substring(0, Math.max(0, start));
    let after = str.substring(Math.min(str.length, end + 1));
    return before + replacement + after;
}
