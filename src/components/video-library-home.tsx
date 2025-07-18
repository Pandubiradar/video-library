import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import '../App.css'


export function VideoLibraryHome() {
    return (
        <div style={{ height: '500px' }} className="d-flex justify-content-center align-items-center">
            <div>
                <div>
                    <Link to="/user-login"><Button variant="contained" color="primary"> User Login </Button></Link>
                    <Link to="/admin-login" className="mx-2"><Button variant="contained" color="secondary"> Admin login </Button></Link>
                </div>
                <div className="text-center mt-2">
                    <Link to="/user-register">New user? </Link>
                </div>
            </div>
        </div>
    )
}