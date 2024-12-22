import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { postLogin } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction'
import { FaSpinner } from "react-icons/fa";
const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error("invalid email")
            return;
        }

        if (!password) {
            toast.error("invalid password")
            return;
        }
        setIsLoading(true)
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            setIsLoading(false)
            navigate('/')
            toast.success(data.EM)
        } else {
            toast.error(data.EM)
        }
    }

    const handleBack = () => {
        navigate('/')
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Dont have an account yet?</span>
                <button className='btn-signup' onClick={() => navigate('/register')}>Sign Up</button>
            </div>
            <div className='title col-4 mx-auto'>Quizz</div>
            <div className='welcome col-4 mx-auto'>Who is this?</div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='forgot-password'>Forgot password?</div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => { handleLogin() }}
                        disabled={isLoading}
                    >
                        {isLoading === true && < FaSpinner className='loader-icon' />}
                        <span>Login</span>
                    </button>
                </div>
                <div className='back' onClick={() => { handleBack() }}>Back to homepage</div>
            </div>

        </div>
    )
}

export default Login;