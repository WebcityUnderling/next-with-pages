import styles from "@/styles/components/form-inputs.module.css"

export default function RadioInput(props) {
    const inputProps = {...props}
    delete inputProps.label
    delete inputProps.className
    
    return (
        <label className={`${styles['input-group__inline-input']} ${styles['input-group__radio']} ${props.className ?? ''}`}>
            <input type="radio" {...inputProps} />
            <span>{props?.label}</span>
        </label>
    )
}