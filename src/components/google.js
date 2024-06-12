import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Google() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    saveUserToDatabase(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const saveUserToDatabase = (userData) => {
        axios.post(`${process.env.REACT_APP_BASE_API_URL}/user-login`, userData)
            .then(response => {
                console.log('User saved to database:', response.data);
            })
            .catch(error => {
                console.error('Error saving user to database:', error);
            });
    };

    const logOut = () => {
        googleLogout();
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}

export default Google;
