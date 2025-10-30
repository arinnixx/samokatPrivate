export type ObjectWith<T, K extends string | number = string> = {
    [key in K]: T
}