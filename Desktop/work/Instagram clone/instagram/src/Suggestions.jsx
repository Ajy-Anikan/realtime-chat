import React, { useEffect, useState } from "react";
import images from './assetsMap'

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/profile")
      .then((data) => data.json())
      .then((data) => setProfile(data))
      .catch((error) => console.log(error));

    fetch("http://localhost:3001/suggestions")
      .then((data) => data.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.log(error));
  }, []);


  const handlefollow = async(id,username) => {
    axios.post("http://localhost:3001/follow", {"id":id,"username":username})
      .then(() => alert('followed'))
      .catch(error => console.log(error));

  }

  return (
    <div>
      <div className="suggestions w-75 m-4">
        {profile ? (
          <div className="d-flex">
            <img
              className="dp rounded-circle"
              src={images[profile.profilePic.split('/').pop()] || profile.profilePic}
              alt="Profile pic"
            />
            <h5>{profile.username}</h5>
            <small className="ms-auto text-primary">Switch</small>
          </div>
        ) : (
          <div>Loading</div>
        )}

        <div className="d-flex mt-3">
          <p>Suggested for you</p>
          <b className="ms-auto">See all</b>
        </div>

         {suggestions.length > 0 ? (
        <div>
          {suggestions.map((suggestion) => (
            <div key={suggestion.id}>

              <div className="d-flex">
                <img
                  className="dp rounded-circle"
                  src={images[suggestion.profilePic.split('/').pop()] || suggestion.profilePic}
                  alt="Profile pic"
                />
                <h5>{suggestion.username}</h5>
                <a className="text-primary ms-auto" onClick={handlefollow(suggestions.id,suggestion.username)}>Follow</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          Loading...
        </div>
      )}


      </div>
    </div>
  );
}

export default Suggestions;