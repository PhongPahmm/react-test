import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './SignUp.scss'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { postSignUp } from "../../services/ApiServices";
import { toast } from 'react-toastify';

const SignUp = (props) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/')
    }

    const handleSignUp = async () => {
        let data = await postSignUp(email, username, password)
        if (data && data.EC === 0) {
            navigate('/login')
            toast.success(data.EM)
        } else {
            toast.error(data.EM)
        }
    }
    return (
        <>
            <div className="login-container">
                <div className='header'>
                    <span>Already have an account?</span>
                    <button className='btn-login' onClick={() => navigate('/login')}>Login</button>
                </div>
                <div className='title col-4 mx-auto'>Quizz</div>
                <div className='welcome col-4 mx-auto'>Who is this?</div>
                <div className='content-form col-4 mx-auto'>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            required
                            type={'email'}
                            className='form-control'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Username</label>
                        <input
                            required
                            type={'text'}
                            className='form-control'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className='form-group password-container'>
                        <label>Password</label>
                        <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            className='form-control'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {showPassword ?
                            <span
                                className="show-hide-pass"
                                onClick={() => setShowPassword(false)}>
                                <IoIosEye />
                            </span>
                            :
                            <span
                                className="show-hide-pass"
                                onClick={() => setShowPassword(true)}>
                                <IoIosEyeOff />
                            </span>
                        }
                    </div>
                    <div>
                        <button
                            className='btn-submit'
                            onClick={() => { handleSignUp() }}
                        >Sign Up</button>
                    </div>
                    <div className='back' onClick={() => { handleBack() }}>Back to homepage</div>
                </div>

            </div>
        </>
    )
}
export default SignUp; 