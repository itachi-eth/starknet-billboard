export interface InputProps {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string,
    startAdornment?: React.ReactNode,
    bgcolor?: string,
    textcolor?: string
    margin?: string
}