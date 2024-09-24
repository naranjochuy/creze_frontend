
export const Form = ({ children, title = "" }) => {

    return (
        <form className="auth-form" noValidate>
            <h2>{ title }</h2>
            { children }
        </form>
    )
}
