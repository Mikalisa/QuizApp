import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../stylesheets/Header.css';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()} className="logInOutButton">
              Log In first to start!
            </button>
          )
    )
}

export default LoginButton