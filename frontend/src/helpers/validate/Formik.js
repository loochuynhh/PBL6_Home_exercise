import { useFormik } from "formik";
import * as Yup from "yup";

export const useLoginFormik = () => {
    return useFormik({
        initialValues: {
            username: "",
            password: "",
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .required("Username or email is required")
                .test(
                    "is-username-or-email",
                    "Please enter at least 4 characters a valid username or email",
                    function (value) {
                        const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
                        const isValidUsername = /^[a-zA-Z0-9_]{4,}$/.test(value);
                        return isValidEmail || isValidUsername;
                    }
                ),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                ),
        }),

        onSubmit: (values) => {
            console.log(values);
        },
    });
};

export const useSignUpFormik = () => {
    return useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .required("Required")
                .min(4, "Must be 4 characters or more"),
            email: Yup.string()
                .required("Required")
                .matches(
                    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Please enter a valid email"
                ),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                ),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Confirm password must match password")
        }),

        onSubmit: (values) => {
            console.log(values);
        },
    });
};