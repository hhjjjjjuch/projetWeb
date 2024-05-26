import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import './loginStyles.css';
import backgroundImage from './my.gif';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    // Capture the "from" state or default to "/"
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (data) => {
        setError("");
        try {
            const response = await fetch('http://localhost:8012/basededonne/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                if (result.success) {
                    dispatch(authLogin(result.user));
                    navigate(from, { replace: true });
                } else {
                    throw new Error(result.error);
                }
            } else {
                throw new Error(result.error || 'Failed to log in');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight" style={{ color: '#00FF00' }}>Login to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">Sign Up</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='space-y-5'>
                        <Input
                            label="ID: "
                            placeholder="Enter your ID"
                            {...register("id", { required: true })}
                            name="id"
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", { required: true })}
                            name="email"
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            name="password"
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
