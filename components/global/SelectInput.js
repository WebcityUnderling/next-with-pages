import styles from "@/styles/components/form-inputs.module.css"

export default function SelectInput(props) {
    const selectOptions = {...props}
    delete selectOptions.className
    delete selectOptions.label
    delete selectOptions.options

    return (
        <div className={`${styles['input-group']} ${props?.className ?? ''}`}>
            <label className={styles['input-group__label']} id={props?.htmlFor}>{props?.label}</label>
            <select
                {...selectOptions}
                className={styles['input-group__select']}
            >
                {props.options && props.options.map((o, i) => (
                    <option value={o.key} key={i}>{o.value}</option>
                ))}
            </select>
        </div>
    )
}