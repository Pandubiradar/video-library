
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { CategoryContract } from "../contract/CategoryContract";
import type { VideoContract } from "../contract/VideoContract";
import { TextField, Select,MenuItem } from "@mui/material";


export function EditVideo() {

    const [categories, setCategories] = useState<CategoryContract[]>();

    const [videos, setVideos] = useState<VideoContract[]>([{ video_id: 0, title: '', description: '', url: '', comments: '', views: 0, likes: 0, category_id: 0 }]);

    let navigate = useNavigate();

    let params = useParams();

    const formik = useFormik({
        initialValues: {
            video_id: videos[0].video_id,
            title: videos[0].title,
            description: videos[0].description,
            comments: videos[0].comments,
            likes: videos[0].likes,
            views: videos[0].views,
            url: videos[0].url,
            category_id: videos[0].category_id
        },
        onSubmit: (video) => {
            axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`, video)
                .then(() => {
                    console.log('modified');
                })
            alert('Video Modified Successfully.');
            navigate('/admin-dashboard');
        },
        enableReinitialize: true
    })

    function LoadCategories() {
        axios.get(`http://127.0.0.1:5050/get-categories`)
            .then(response => {
                response.data.unshift({ category_id: -1, category_name: 'Select Category' });
                setCategories(response.data);
            })
    }


    function LoadVideos() {
        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
            .then(response => {
                setVideos(response.data);
            })
    }


    useEffect(() => {
        LoadCategories();
        LoadVideos();
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="border border-2 p-2 rounded rounded-3 mt-2 text-center w-25">
            <h2>Edit Video</h2>
                <dl className="row">

                    <dd><TextField onChange={formik.handleChange} value={formik.values.video_id} type="number" label="Video_Id" name="video_id" variant="standard"></TextField></dd>
                    <dd><TextField onChange={formik.handleChange} value={formik.values.title} type="text" label="Title" name="title" variant="standard"></TextField></dd>
                    <dd><TextField onChange={formik.handleChange} value={formik.values.description} type="text" label="Description" name="description" variant="standard"></TextField></dd>
                    <dd><TextField onChange={formik.handleChange} value={formik.values.comments} type="text" label="Comments" name="comments" variant="standard"></TextField></dd>
                    <dd><TextField onChange={formik.handleChange} value={formik.values.url} type="text" label="URL" name="url" variant="standard"></TextField></dd>
                    <dd><TextField onChange={formik.handleChange} value={formik.values.likes} type="number" label="Likes" name="likes" variant="standard"></TextField></dd>
                    <dd><TextField onChange={formik.handleChange} value={formik.values.views} type="number" label="Views" name="views" variant="standard"></TextField></dd>
                    <dd><Select onChange={formik.handleChange}    value={formik.values.category_id} type="number" label="Category_Id" name="category_id" variant="standard">
                        {
                            categories?.map(category => <MenuItem key={category.category_id} value={category.category_id}>{category.category_name} </MenuItem>)
                        }
                    </Select></dd>
                </dl>
                <button type="submit" className="btn btn-success mx-2">Save</button>
                <Link to='/admin-dashboard' className="btn btn-danger">Cancel</Link>
            </form>
        </div>
    )
}
