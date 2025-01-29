import { useState } from "react"
import { useNavigate } from "react-router";

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {

        const user = { email, password }
        fetch("http://localhost:4000/api/auth/login", {
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(res => {
            if (res.status === 404) {
                alert("Kullanıcı bulunamadı")
            }
            return res.json()
        }).then(data => {
            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken)
                navigate("/home")
            }
        }).catch(err => console.log(err))
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center" }}>
            <h1>Giriş Yap</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <input onChange={(e) => setEmail(e.target.value)} style={{ width: "300px" }} type="text" placeholder="Email" />
                </div>
                <div>
                    <input onChange={(e) => setPassword(e.target.value)} style={{ width: "300px" }} type="password" placeholder="Sifre" />
                </div>

                <button onClick={handleLogin}>Giriş Yap</button>
            </div>
        </div>
    )
}

export default Login