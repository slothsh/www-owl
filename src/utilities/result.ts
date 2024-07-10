export const enum ResultKind {
    SUCCESS,
    ERROR,
}

export class Result {
    constructor(kind: ResultKind, msg?: string) {
        this.kind = kind;

        if (msg)
            this.msg = msg;
    }

    ok(): boolean {
        return this.kind === ResultKind.SUCCESS;
    }

    error(): boolean {
        return !this.ok();
    }

    message(): string {
        if (this.msg)
            return this.msg;

        return "";
    }

    private kind: ResultKind;
    private msg?: string = undefined;
}

export function ok(message?: string): Result {
    return new Result(ResultKind.SUCCESS, message);
}

export function err(message: string): Result {
    return new Result(ResultKind.ERROR, message);
}
