import Meta from "antd/es/card/Meta"
import { useState } from "react"
import axios from "axios"
import './signup.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;


const SignUp = () => {
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [submissionError, setSubmissionError] = useState(false)
    const [formValues, setFormValues] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const validate = () => {
        const newError = {}

        if (!formValues.userName.trim()) {
            newError.userName = "userName is required"
        }

        if (!formValues.email.trim()) {
            newError.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newError.email = "invalid email format"
        }

        if (!formValues.password.trim()) {
            newError.password = "Password is required"
        }

        if (!formValues.confirmPassword.trim()) {
            newError.confirmPassword = " confirm Password is required"
        } else if (formValues.confirmPassword !== formValues.password) {
            newError.confirmPassword = "Password don't match"
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
                const res = await axios.post(`${API_URL}/auth/signup`, formValues,
                     { withCredentials: true }
                )
                alert(res.data.message)
                navigate('/')
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

                <div>
                    <label>Email:</label>
                    <input name="email" value={formValues.email}
                        onChange={(e) => handleChange(e)} />
                </div>
                <p className="error"> {error.email}</p>
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

                {/* Confirm Password Field */}
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <div className="password-wrapper">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            onChange={(e) => handleChange(e)}
                            className="password-input"
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowConfirm((prev) => !prev)}
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <p className="error">{error.confirmPassword}</p>
                  <p style={{marginLeft:"6rem",color:"red"}}>{submissionError.message}</p>
                <button type="submit">Submit</button>
                <span>Aleady have an account?<Link to='/'>Login</Link> </span>
            </form>
        </div>
    )
}

export default SignUp