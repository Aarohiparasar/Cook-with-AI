import Meta from "antd/es/card/Meta"
import { useState } from "react"
import axios from "axios"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import './login.css'

const API_URL = import.meta.env.VITE_API_URL;


const Login = () => {
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [submissionError, setSubmissionError] = useState(false)
    const [formValues, setFormValues] = useState({
        userName: '',

        password: '',
    })
    const [error, setError] = useState({
        userName: '',
        password: '',
    })

    const validate = () => {
        const newError = {}

        if (!formValues.userName.trim()) {
            newError.userName = "userName is required"
        }

        if (!formValues.password.trim()) {
            newError.password = "Password is required"
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const validated = validate()
            console.log("✅ Form Submitted:", formValues);


            if (validated) {
                const res = await axios.post(`${API_URL}/auth/login`,formValues,
                { withCredentials: true }
                )

                const token = res.data.token; // 🔥 get token
                console.log("token",token)
            // 🔥 store token
            localStorage.setItem("token", token);

            // 🔥 also update AuthContext state
            if (window.setToken) {
                window.setToken(token);
            }
                navigate('/home')
            }
        } catch (error) {
            setSubmissionError(error.response.data)
        }
    }

    return (
        <div className="signupPage">
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label>UserName:</label>
                    <input name="userName" value={formValues.userName}
                        onChange={(e) => handleChange(e)} />
                </div>
                <p className="error"> {error.userName}</p>

                <div className="input-group">
                    <label>Password:</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formValues.password}
                            onChange={(e) => handleChange(e)}
                            className="password-input"
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <p className="error">{error.password}</p>
                <p style={{ marginLeft: "6rem", color: "red" }}>{submissionError.message}</p>
                <button type="submit">Submit</button>
                <span>Forget password? <Link to='/signup'>signUp</Link></span>
            </form>
        </div>
    )
}

export default Login
