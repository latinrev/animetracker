export interface BuildFieldOptions {
    value?: string
    required?: boolean
    hidden?: boolean
}
export interface BuildFieldReturnType extends BuildFieldOptions {
    fieldName: string
}
