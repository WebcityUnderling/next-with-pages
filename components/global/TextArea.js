import styles from "@/styles/components/form-inputs.module.css"

export default function TextArea(props) {
    // don't pass props to the input, if they shouldn't be on the input
    let inputProps = {...props};
    delete inputProps.className
    delete inputProps.label
    delete inputProps.error

    return (
        <div className={`${styles['input-group']} ${props?.className ?? ''}`}>
            <label id={props?.htmlFor} className={styles['input-group__label']}>{props?.label}</label>
            <textarea
                className={styles['input-group__textarea']}
                {...inputProps}            
                type={inputProps?.type ?? 'text'}
            />
            {props?.error && (<p className={styles['input-group__error']}>{props.error}</p>)}
        </div>
    )
}