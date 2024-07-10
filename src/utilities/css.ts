export enum CssUnit {
    CENTIMETER = "cm",
    MILLIMETER = "mm",
    SECOND = "s",
    MILLISECOND = "ms",
    INCH = "in",
    PIXEL = "px",
    PICA = "pc",
    POINT = "pt",
    EM = "em",
    REM = "rem",
    PERCENT = "%",
    VIEWPORT_WIDTH = "vw",
    VIEWPORT_HEIGHT = "vh",
    VIEWPORT_MIN = "vmin",
    VIEWPORT_MAX = "vmax",
    EX = "ex",
    CH = "ch",
}

export class CssUnitValue {
    constructor(value: number, unit: CssUnit) {
        this.value = value;
        this.unit = unit;
    }

    toString(): string {
        // TODO: Bounds checking based on unit
        return `${this.value}${this.unit}`;
    }

    private value: number;
    private unit: CssUnit;
}

export namespace Css {
    export function cm(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.CENTIMETER);
    }

    export function mm(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.MILLIMETER);
    }

    export function sec(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.SECOND);
    }

    export function ms(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.MILLISECOND);
    }

    export function inch(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.INCH);
    }

    export function px(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.PIXEL);
    }

    export function pc(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.PICA);
    }

    export function pt(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.POINT);
    }

    export function em(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.EM);
    }

    export function rem(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.REM);
    }

    export function percent(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.PERCENT);
    }

    export function vw(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.VIEWPORT_WIDTH);
    }

    export function vh(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.VIEWPORT_HEIGHT);
    }

    export function vmin(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.VIEWPORT_MIN);
    }

    export function vmax(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.VIEWPORT_MAX);
    }

    export function ex(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.EX);
    }

    export function ch(value: number): CssUnitValue {
        return new CssUnitValue(value, CssUnit.CH);
    }

    export function calc(formatString: string, ...values: Array<CssUnitValue>): string {
        // TODO: Check that format string has enough placeholders
        //
        let expressionString = formatString;
        for (const unitValue of values) {
            expressionString = expressionString.replace("{}", unitValue.toString());
        }

        return `calc(${expressionString})`;
    }

    export function variable(identifier: string): string {
        return `var(--${identifier})`;
    }

    export function scalar(value: number): string {
        return `${value}`;
    }
}
