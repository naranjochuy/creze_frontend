
export const InputText = ({ _key, type = "text", label, value, onInputChange, error, autoFocus, onKeyPress }) => {

    return (
        <>
            <label>{ label }</label>
            <input
                type={ type }
                name={ _key }
                value={ value }
                onChange={ onInputChange }
                autoFocus={ autoFocus }
                onKeyPress={onKeyPress}
                className={ error ? "input-error" : ""}
            />
            { error && <div className="div-error"><p>{ error }</p></div> }
        </>
    )
}
