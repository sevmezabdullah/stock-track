
import { Routes, Route } from "react-router";
import Login from "../Login";
import App from "../App";
import { useEffect, useState } from "react";
const Navigator = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setToken(token)
        }
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<App />} />
        </Routes>
    )
}

export default Navigator