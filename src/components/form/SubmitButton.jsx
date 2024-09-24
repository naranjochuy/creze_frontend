 
 export const SubmitButton = ({ label, onSubmit}) => {

    return (
        <button
            className="btn-primary"
            onClick={ onSubmit }
        >
            { label }
        </button>
    )
 }
