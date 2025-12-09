import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/profile")
      .then(res => setProfile(res.data))
      .catch(error => console.log(error));

    axios.get("http://localhost:3001/followers")
      .then(res => setFollowers(res.data))
      .catch(error => console.log(error));
  }, []);

  function HandleOnChange(e) {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleUpdate = async () => {
    axios.put("http://localhost:3001/profile", profile)
      .then(() => console.log("Profile updated"))
      .catch(error => console.log(error));
  };

  return (
    <div>
      {profile ? (
        <div className="m-5">
          <img src={profile.profilePic} className="profile rounded-circle" alt="Profile" />
          <h5>{profile.username}</h5>

          <input
            type="text"
            value={profile.username}
            name="username"
            className="form-control my-4"
            onChange={HandleOnChange}
          />

          <input
            type="text"
            name="profilePic"
            value={profile.profilePic}
            className="form-control"
            onChange={HandleOnChange}
          />

          <button className="btn btn-primary my-4" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <div>Loading profile...</div>
      )}

      {followers.length > 0 ? (
        <ul>
          {followers.map(f => (
            <div key={f.username}></div>
          ))}
        </ul>
      ) : ( 
        <div>Loading followers...</div>
      )}
    </div>
  );
}

export default Profile;
    