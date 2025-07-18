import { MenuItem, Select, TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CategoryContract } from "../contract/CategoryContract";
import { useCookies } from "react-cookie";


export function AddVideo() {

    let navigate = useNavigate();

    const [cookies , ,removeCookies] = useCookies(['adminid']);

    const [categories, setCategories] = useState<CategoryContract[]>();

    const formik = useFormik({
        initialValues: {
            video_id: 0,
            title: '',
            description: '',
            comments: '',
            likes: 0,
            views: 0,
            url: '',
            category_id: 0
        },
        onSubmit: (video) => {
            axios.post(`http://127.0.0.1:5050/add-video`, video)
                .then(() => {
                    console.log('video added');
                })
            alert('Video Added Successfully..');
            navigate('/admin-dashboard');
        }
    })

    function VideoLoad() {
        axios.get(`http://127.0.0.1:5050/get-categories`)
            .then(response => {
                response.data.unshift({ category_id: -1, category_name: 'Select Category' });
                setCategories(response.data);
            })
    }

    useEffect(() => {
        if (cookies['adminid'] === undefined) {
            navigate('/admin-login')
        } else {
            VideoLoad();
        }

    }, [])

    function handleSignOut() {
        removeCookies('adminid');
        navigate('/')
    }

    return (
        <div>
            <div>
            <button className="btn btn-link" onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className="d-flex justify-content-center  ">

                <form onSubmit={formik.handleSubmit} className="border border-2 p-2 rounded rounded-3 mt-2 text-center w-25" >
                    <dl className="">
                        <h2>Add Video</h2>
                        <dd><TextField onChange={formik.handleChange} type="number" label="Video_Id" name="video_id" variant="standard"></TextField></dd>
                        <dd><TextField onChange={formik.handleChange} type="text" label="Title" name="title" variant="standard"></TextField></dd>
                        <dd><TextField onChange={formik.handleChange} type="text" label="Description" name="description" variant="standard"></TextField></dd>
                        <dd><TextField onChange={formik.handleChange} type="text" label="Comments" name="comments" variant="standard"></TextField></dd>
                        <dd><TextField onChange={formik.handleChange} type="text" label="URL" name="url" variant="standard"></TextField></dd>
                        <dd><TextField onChange={formik.handleChange} type="number" label="Likes" name="likes" variant="standard"></TextField></dd>
                        <dd><TextField onChange={formik.handleChange} type="number" label="Views" name="views" variant="standard"></TextField></dd>
                        <dd><Select onChange={formik.handleChange} type="" label="Category_Id" name="category_id" variant="standard">
                            {
                                categories?.map(category => <MenuItem key={category.category_id} value={category.category_id}>{category.category_name} </MenuItem>)
                            }
                        </Select></dd>
                        <Button className="btn mx-2 btn-primary" variant="contained" color="primary" type="submit">Add Video</Button>
                        
                        <Link to="/admin-dashboard" className="btn btn-warning">Cancel</Link>
                    </dl>


                </form>

            </div>
        </div>
    )
}