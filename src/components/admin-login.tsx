import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"
import { TextField, Button, } from "@mui/material";
import * as yup from "yup";


export function AdminLogin() {
    const [, setCookie] = useCookies(['adminid'])

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: ''
        },
        validationSchema: yup.object({
            admin_id: yup.string()
                .required('Admin ID is required')
                .matches(/[A-Z]/, ' at least one uppercase letter')
                .matches(/[@_.$]/, 'at least one special character')
                .min(4, 'Admin ID must be at least 4 characters'),
            password: yup.string()
                .required('Password is required')
                .min(4, 'at least 4 characters')
                .matches(/[A-Z]/, ' at least one uppercase letter')
                .matches(/[@#$]/, 'at least one special character'),
        }),
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:5050/get-admin`)
                .then(response => {
                    let result = response.data.find((item: any) => item.admin_id === admin.admin_id);
                    if (result) {
                        if (result.password === admin.password) {
                            setCookie('adminid', admin.admin_id);
                            navigate('/admin-dashboard');
                        } else {
                            alert('Invalid Password');
                        }
                    } else {
                        alert(`Admin Doesn't Exist`);
                    }
                })
        },
        validateOnMount: true
    })

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <form onSubmit={formik.handleSubmit} className="border border-2 rounded rounded-3  w-25 text-center py-5">
                <h2>Admin Login</h2>
                <dl>
                    <dd>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          
                            label="admin_Id"
                            name="admin_id"
                            variant="standard"
                       
                        />
                    </dd>
                    <dd className="text-danger">{(formik.touched.admin_id && formik.errors.admin_id) ? formik.errors.admin_id : null}</dd>

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
    
                <Button variant="contained" color="primary" type="submit"  disabled={!(formik.isValid && formik.dirty)}> Login </Button>

            </form>
        </div>
    )
}