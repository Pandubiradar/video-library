import { configureStore } from "@reduxjs/toolkit";
import videoSlicer from "../slicer/video-slicer"; 

export default configureStore({
    reducer: videoSlicer
})