import { useState, useEffect } from "react"
import { Form, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/RegisterPage.css"
import Spinner from "../components/Spinner"
import { DollarSign, Eye, EyeOff } from "lucide-react"

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true)
      await axios.post("https://expense-management-systems.vercel.app/api/v1/users/register", values)
      message.success("Registration Successful")
      setLoading(false)
      navigate("/login")
    } catch (error) {
      setLoading(false)
      message.error("Something went wrong")
    }
  }

  // Prevent for logged-in user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/")
    }
  }, [navigate])

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className="register-container">
      {loading && <Spinner />}
      <div className="register-card">
        <div className="card-header">
          <div className="logo">
            <DollarSign />
          </div>
          <h1>Create Account</h1>
          <p>Join us to start managing your expenses</p>
        </div>
        <Form layout="vertical" onFinish={submitHandler} className="card-content">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
          >
            <Input type="email" />
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
          <button className="register-button" type="submit">
            Register
          </button>
        </Form>
        <div className="links">
          <Link to="/login">Already registered? Click here to login</Link>
        </div>
        <p className="terms">By registering, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}

export default Register

