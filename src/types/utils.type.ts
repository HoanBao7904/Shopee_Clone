export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}
//cú pháp -? loại bẻ undefined của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
