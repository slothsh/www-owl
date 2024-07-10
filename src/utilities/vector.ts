export interface IVector2 {
    x: number,
    y: number,
}

export class Vector2 implements IVector2 {
    x: number = 0;
    y: number = 0;

    static with(x: number, y: number) {
        return new Vector2(x, y);
    }

    constructor(x?: number, y?: number) {
        if (x) this.x = x;
        if (y) this.y = y;
    }
}

export function Vec2(x: number, y: number): IVector2 {
    return { x, y };
}

export interface IVec3 {
    x: number,
    y: number,
    z: number,
}

export function Vec3(x: number, y: number, z: number): IVec3 {
    return { x, y, z };
}

export interface IVec4 {
    x: number,
    y: number,
    w: number,
    h: number,
}

export function Vec4(x: number, y: number, w: number, h: number): IVec4 {
    return { x, y, w, h };
}

export interface IVec2Nullable {
    x: number | null,
    y: number | null,
}

export function Vec2Nullable(x: number | null, y: number | null): IVec2Nullable {
    return { x, y };
}

export interface IVec3Nullable {
    x: number | null,
    y: number | null,
    z: number | null,
}

export function Vec3Nullable(x: number | null, y: number | null, z: number | null): IVec3Nullable {
    return { x, y, z };
}

export interface IVec4Nullable {
    x: number | null,
    y: number | null,
    w: number | null,
    h: number | null,
}

export function Vec4Nullable(
    x: number | null,
    y: number | null,
    w: number | null,
    h: number | null): IVec4Nullable
{
    return { x, y, w, h };
}

export type ScalarMutator<T> = (value: T) => number | null;

export function nullScalar<T>(value: T): null {
    return null;
}

export interface IVec2Mutator<T> {
    x: ScalarMutator<T>,
    y: ScalarMutator<T>,
}

export interface IVec3Mutator<T> {
    x: ScalarMutator<T>,
    y: ScalarMutator<T>,
    z: ScalarMutator<T>,
}

export interface IVec4Mutator<T> {
    x: ScalarMutator<T>,
    y: ScalarMutator<T>,
    w: ScalarMutator<T>,
    h: ScalarMutator<T>,
}

export function Vec2Mutator<T>(
    x: ScalarMutator<T> | null,
    y: ScalarMutator<T> | null
    ): IVec2Mutator<T> {
    return {
        x: x ?? nullScalar<T>,
        y: y ?? nullScalar<T>,
    }
}

export function Vec3Mutator<T>(
    x: ScalarMutator<T> | null,
    y: ScalarMutator<T> | null,
    z: ScalarMutator<T> | null
    ): IVec3Mutator<T> {
    return {
        x: x ?? nullScalar<T>,
        y: y ?? nullScalar<T>,
        z: z ?? nullScalar<T>,
    }
}

export function Vec4Mutator<T>(
    x: ScalarMutator<T> | null,
    y: ScalarMutator<T> | null,
    w: ScalarMutator<T> | null,
    h: ScalarMutator<T> | null): IVec4Mutator<T> {
    return {
        x: x ?? nullScalar<T>,
        y: y ?? nullScalar<T>,
        w: w ?? nullScalar<T>,
        h: h ?? nullScalar<T>,
    };
}

export function Vec2Pack(lhs: IVector2, rhs: IVec2Nullable): IVector2 {
    return {
        x: rhs.x ?? lhs.x,
        y: rhs.y ?? lhs.y,
    }
}

export function Vec3Pack(lhs: IVec3, rhs: IVec3Nullable): IVec3 {
    return {
        x: rhs.x ?? lhs.x,
        y: rhs.y ?? lhs.y,
        z: rhs.z ?? lhs.z,
    }
}

export function Vec4Pack(lhs: IVec4, rhs: IVec4Nullable): IVec4 {
    return {
        x: rhs.x ?? lhs.x,
        y: rhs.y ?? lhs.y,
        w: rhs.w ?? lhs.w,
        h: rhs.h ?? lhs.h,
    }
}
