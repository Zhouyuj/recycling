/**
 * Created by wujiahui on 2018/11/6.
 */
export class Result<T> {
    constructor(public status?: number, public data?: T, public message?: string) {
    }
}

export interface ResultError {
    message?: string;
    status?: number;
}
