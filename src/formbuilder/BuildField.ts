export interface BuildFieldOptions {
    value?: string;
    required?: boolean;
    hidden?: boolean;
    selectOptions?: Array<String>;
    type?: string;
    label?: string;
    dependantOnKeyValue?: {
        name?: string;
        value?: any;
    };
}
export interface BuildFieldReturnType extends BuildFieldOptions {
    fieldName: string;
}

export const buildField = (fieldName: string, options: BuildFieldOptions = {}): BuildFieldReturnType => {
    const {
        value = "",
        required = false,
        hidden = false,
        selectOptions = [],
        type = "text",
        label = fieldName,
        dependantOnKeyValue = {},
    } = options;
    return { fieldName, value, required, hidden, selectOptions, type, label, dependantOnKeyValue };
};
