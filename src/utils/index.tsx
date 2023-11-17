
type NonFunctionType<T> = {
    [K in keyof T]: T[K] extends Function ? never : T[K];
}
export declare namespace ClassUtils{
    type PropsTypes<T> = NonFunctionType<T>
}

