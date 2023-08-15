import React from 'react';
import { useField, ErrorMessage } from 'formik';

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);


    return (
        <div className="form-group mb-3 ">
            <label htmlFor={field.name} className="label__style mb-0">{label}</label>
            <div>
                <input
                    className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"}`}
                    autoComplete="off"
                    {...field}
                    {...props}
                />
            </div>
            <ErrorMessage component="p" name={field.name} className="errorMessage" />
        </div>
    )
}

export default TextField;