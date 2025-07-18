




import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToSaveList } from "../slicer/video-slicer";
import type { VideoContract } from "../contract/VideoContract";
import { Button, Card, CardActions, CardContent, Typography, TextField } from "@mui/material";
// import store from "../store/store";

export function UserDashBoard() {

    const [cookies, , removeCookies] = useCookies(['userid']);
    const [videos, setVideos] = useState<VideoContract[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<VideoContract[]>([]);
    const [likedVideos, setLikedVideos] = useState<number[]>([]);


    let navigate = useNavigate();
    let dispatch = useDispatch();

    function LoadVideos() {
        axios.get(`http://127.0.0.1:5050/get-videos`)
            .then(response => {
                setVideos(response.data);
                setFilteredVideos(response.data);
            });
    }

    useEffect(() => {
        if (cookies['userid'] === undefined) {
            navigate('/user-login');
        } else {
            LoadVideos();
        }
    }, []);

    function handleSignOut() {
        removeCookies('userid');
        navigate('/');
    }

    function handleSaveClick(video: VideoContract) {
        dispatch(addToSaveList(video));
    }

    function handleChange(e: any) {
        const result = videos.filter(video => video.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredVideos(result);
    }

    function handleLikeClick(videoId: number) {
    let isLiked = likedVideos.includes(videoId);

    const updatedVideos = videos.map(video => {
        if (video.video_id === videoId) {
            return { ...video, likes: video.likes + (isLiked ? -1 : 1) };
        }
        return video;
    });

    setVideos(updatedVideos);
    setFilteredVideos(updatedVideos);

    if (isLiked) {
        setLikedVideos(likedVideos.filter(id => id !== videoId));
        axios.post(`http://127.0.0.1:5050/update-likes`, { videoId, increment: -1 });
    } else {
        setLikedVideos([...likedVideos, videoId]);
        axios.post(`http://127.0.0.1:5050/update-likes`, { videoId, increment: 1 });
    }
}


    function handleViewClick(videoId: number) {
        const updatedVideos = videos.map(video => {
            if (video.video_id === videoId) {
                return { ...video, views: video.views + 1 };
            }
            return video;
        });
        setVideos(updatedVideos);
        setFilteredVideos(updatedVideos);

        axios.post(`http://127.0.0.1:5050/update-views`, { videoId });
    }

    return (
        <div>
            <header className="d-flex justify-content-between align-items-center">
                <h2>{cookies['userid']} - Dashboard</h2>
                <div>
                    <TextField
                        label="Search"
                        variant="standard"
                        size="small"
                        color="primary"
                        className="bg-white rounded px-2"
                        onChange={handleChange}
                    />
                    <span className="bi bi-search btn btn-success ms-2" style={{ cursor: "pointer" }}></span>
                </div>
                <button onClick={handleSignOut} className="btn btn-link">SignOut</button>
                {/* {store.getState().videosCount} */}
            </header>

            <section className="mt-4 d-flex flex-wrap">
                {filteredVideos.map(video =>
                    <Card className="m-2" style={{ width: 250 }} key={video.video_id}>
                        <iframe
                            src={video.url}
                            height={200}
                            width={250}
                            onClick={() => handleViewClick(video.video_id)}
                            style={{ cursor: "pointer" }}
                        ></iframe>
                        <CardContent>
                            <Typography variant="h6">{video.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{video.description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button className="bi bi-hand-thumbs-up" size="small" onClick={() => handleLikeClick(video.video_id)}>
                                {video.likes}
                            </Button>
                            <span className="bi bi-eye mx-2">{video.views}</span>
                            <Button className="bi bi-floppy" size="small" onClick={() => handleSaveClick(video)}></Button>
                        </CardActions>
                    </Card>
                )}
            </section>
        </div>
    );
}


