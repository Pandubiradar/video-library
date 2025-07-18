import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, } from "@mui/material";
import * as yup from "yup";



export function UserLogin() {


    const [, setCookies] = useCookies(['userid']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: ''
        },
        validationSchema: yup.object({
            user_id: yup.string()
                .required('User ID is required')
                .matches(/[A-Z]/, ' at least one uppercase letter')
                .matches(/[@_.$]/, 'at least one special character')
                .min(4, 'User ID must be at least 4 characters'),
            password: yup.string()
                .required('Password is required')
                .min(4, 'at least 4 characters')
                .matches(/[A-Z]/, ' at least one uppercase letter')
                .matches(/[@#$]/, 'at least one special character'),
        }),
        onSubmit: (user) => {
            axios.get(`http://127.0.0.1:5050/get-users`)
                .then(response => {
                    let result = response.data.find((item: any) => item.user_id === user.user_id);
                    if (result) {
                        if (result.password === user.password) {
                            navigate('/user-dashboard')
                            setCookies('userid', user.user_id)
                        } else {
                            alert(`invalid password`)
                        }
                    } else {
                        navigate('/user-login-error')
                    }
                })
        }
    })
    return (
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={formik.handleSubmit} className="border border-2 rounded rounded-3 w-25 py-4 text-center pg-primary">
                <p className="fw-bold fs-4">User Login</p>
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
                            label="password"
                            name="password"
                            type="password"
                            variant="standard"
                        />
                    </dd>

                    <dd className="text-danger">{(formik.touched.password && formik.errors.password) ? formik.errors.password : null}</dd>

                </dl>

                <Button variant="contained" color="primary" type="submit" disabled={!(formik.isValid && formik.dirty)} > Login </Button>

                <div className="mt-2">
                    <Link to="/user-register">Create User?</Link>
                </div>
            </form>
        </div>
    )
}