import React from "react";
import {CircularProgress} from "@mui/material";

class Loading extends React.Component {
    render() {
        return (
            <div style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                height: "100vh",
                width: "100vw"
            }}>
                <CircularProgress/>
            </div>
        )
    }
}

export default Loading