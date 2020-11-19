import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = ({userProfile}) => {
    const { user } = useAuth0();

    return (
        <div>
            {userProfile(user)}
        </div>
    )
}

export default Profile