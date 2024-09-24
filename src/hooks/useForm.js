import { useState } from 'react';

export const useForm = ( initialForm = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [errors, setErrors] = useState({});

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [ name ]: value
        });

        setErrors(current => {
            const { [name]: _, ...rest } = current;
            return rest;
        });
    }
 
    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        errors,
        setErrors
    }
}