export interface BuildFieldOptions {
    value?: string
    required?: boolean
    hidden?: boolean,
    selectOptions?: Array<String>
    type?: string
    label?: string
}
export interface BuildFieldReturnType extends BuildFieldOptions {
    fieldName: string
}
