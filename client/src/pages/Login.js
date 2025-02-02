import { useState, useEffect } from "react"
import { Form, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff, DollarSign } from "lucide-react"
import Spinner from "../components/Spinner"
import "../styles/Loginpage.css"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  // Form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/v1/users/login", values)
      setLoading(false)
      message.success("Login success")
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }))
      navigate("/")
    } catch (error) {
      setLoading(false)
      message.error("Something went wrong")
    }
  }

  // Prevent login for logged-in users
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/")
    }
  }, [navigate])

  return (
    <div className="login-container">
      {loading && <Spinner />}
      <div className="login-card">
        <div className="card-header">
          <div className="logo">
            <DollarSign />
          </div>
          <h1>ExpenseTrack</h1>
          <p>Login to manage your expenses</p>
        </div>
        <Form layout="vertical" onFinish={submitHandler} className="card-content">
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input type="email" placeholder="m@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <div className="password-input">
              <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" />
              <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </Form.Item>
          <div className="remember-me">
            <Input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="card-footer">
            <button className="login-button" type="submit">
              Log in
            </button>
            <div className="links">
              <Link to="/register" className="sign-up">
                Not a user? Click Here to register
              </Link>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login

