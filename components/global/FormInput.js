
export default function FormInput({label, test}) {
    return (
        <input type="text" onInput={test}/>
    )
}