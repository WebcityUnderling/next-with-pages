import styles from "@/styles/components/form-inputs.module.css"

export default function CheckInput(props) {
    const inputProps = {...props}
    delete inputProps.label
    delete inputProps.className
    
    return (
        <label className={`${styles['input-group__inline-input']} ${styles['input-group__checkbox']} ${props.className ?? ''}`}>
            <input type="checkbox" {...inputProps} />
            <span>{props?.label}</span>
        </label>
    )
}