
import { useEffect, useState, useMemo, useCallback } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import type { VideoContract } from "../contract/VideoContract";

export function AdminDashBoard() {
    const [cookies, , removeCookie] = useCookies(['adminid']);
    const [videos, setVideos] = useState<VideoContract[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Load videos with loading state
    const LoadVideos = useCallback(() => {
        setLoading(true);
        axios.get(`http://127.0.0.1:5050/get-videos`)
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error("Error loading videos:", error);
                alert("Failed to load videos.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSignout = useCallback(() => {
        removeCookie('adminid');
        navigate('/');
    }, [removeCookie, navigate]);

    useEffect(() => {
        if (!cookies.adminid) {
            navigate('/');
        } else {
            LoadVideos();
        }
    }, [cookies.adminid, LoadVideos, navigate]);

    const videoRows = useMemo(() => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={3}>Loading videos...</td>
                </tr>
            );
        }

        if (!videos || videos.length === 0) {
            return (
                <tr>
                    <td colSpan={3}>No videos available.</td>
                </tr>
            );
        }

        return videos.map(video => (
            <tr key={video.video_id}>
                <td>{video.title}</td>
                <td>
                    <iframe src={video.url} width={200} height={100} ></iframe>
                </td>
                <td>
                    <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning">
                        <span className="bi bi-pen-fill"></span>
                    </Link>
                    <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger mx-2">
                        <span className="bi bi-trash-fill"></span>
                    </Link>
                </td>
            </tr>
        ));
    }, [videos, loading]);

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>Admin Dashboard</h2>
                <button className="btn btn-link" onClick={handleSignout}>
                    <i className="bi bi-box-arrow-right"></i> Sign Out
                </button>
            </header>

            <section>
                <Link to="/add-video" className="btn btn-primary bi bi-camera-video"> Add New Video </Link>

                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videoRows}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
<td colSpan={3}>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</td>