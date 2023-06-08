import styles from "@/styles/components/form-inputs.module.css"

export default function FieldSet(props) {
    const fieldProps = {...props}
    delete fieldProps.children
    delete fieldProps.legend
    delete fieldProps.errors

    return (
        <fieldset {...fieldProps} className={`${styles['input-group']} ${props.className ?? ''}`}>
            <legend className={styles['input-group__label']}>{props.legend ?? ''}</legend>
            <div className={styles['input-group__children']}>
                {props.children}
            </div>
            {props?.error && (<p className={styles['input-group__error']}>{props.error}</p>)}
        </fieldset>
    )
}