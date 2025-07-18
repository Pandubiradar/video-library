import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, } from "@mui/material";

import * as yup from "yup";


export function UserRegister() {



    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            user_name: '',
            password: '',
            email: '',
            mobile: ''
        },


        validationSchema: yup.object({
            user_id: yup.string()
                .required('User ID is required')
                .matches(/[A-Z]/, ' at least one uppercase letter')
                .matches(/[@_.$]/, 'at least one special character')
                .min(4, 'User ID must be at least 4 characters'),
            user_name: yup.string()
                .matches(/[A-Z]/, ' at least one uppercase letter')
                .required('User Name is required'),
            password: yup.string()
                .required('Password is required')
                .min(4, 'at least 4 characters')
                .matches(/[A-Z]/, ' at least one uppercase letter')
                .matches(/[@#$]/, 'at least one special character'),
            email: yup.string()
                .required('Email is required')
                .email('Invalid email format'),
            mobile: yup.string()
                .required('Mobile is required')
                .matches(/^\+91[0-9]{10}$/, 'Mobile must start with +91 and be followed by 10 digits'),
        }),

        onSubmit: (user) => {
            axios.post(`http://127.0.0.1:5050/register-user`, user)
                .then(() => {
                    console.log(`Registered.`)
                })
            alert("Registered")
            navigate('/user-login');
        }
    })



    return (
        <div className="mt-4 d-flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="border border-2 w-25 rounded-5 text-center py-4" noValidate>
                <h1>user Register</h1>
                <dl>
                    <dd>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="user_Id"
                            name="user_id"
                            variant="standard"
                        
                        />
                    </dd>
                    <dd className="text-danger">{(formik.touched.user_id && formik.errors.user_id) ? formik.errors.user_id : null}</dd>

                    <dd>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="user_name"
                            name="user_name"
                            variant="standard"
                       
                        />
                    </dd>
                    <dd className="text-danger">{(formik.touched.user_name && formik.errors.user_name) ? formik.errors.user_name : null}</dd>

                    <dd>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="password"
                            name="password"
                            type="password"
                            variant="standard"
                       
                        />
                    </dd>
                    <dd className="text-danger">{(formik.touched.password && formik.errors.password) ? formik.errors.password : null}</dd>
                    <dd>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="email"
                            name="email"
                            type="email"
                            variant="standard"
                      
                        />
                    </dd>
                    <dd className="text-danger">{(formik.touched.email && formik.errors.email) ? formik.errors.email : null}</dd>

                    <dd>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="mobile"
                            name="mobile"
                            variant="standard"
                       
                        />
                    </dd>
                    <dd className="text-danger">{(formik.touched.mobile && formik.errors.mobile) ? formik.errors.mobile : null}</dd>

                </dl>
                <Button type="submit" variant="contained" color="primary" disabled={!(formik.isValid && formik.dirty)} > Register </Button>
                <div>
                    <Link to="/user-login">Existing User?</Link>
                </div>
            </form>
        </div>
    )
}