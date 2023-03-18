import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const Profile = () => {
    const userId = useParams();
    console.log(userId);

    return (
        <div>Profile</div>
    )
}

export default Profile