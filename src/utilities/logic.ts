export function clamp(min: number, inner: number, max: number): number {
    return Math.max(min, Math.min(inner, max));
}
