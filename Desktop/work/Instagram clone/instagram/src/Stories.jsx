import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/stories")
      .then((data) => data.json())
      .then((data) => setStories(data))
      .catch((error) => console.log(error));
  }, []);

  const tot = stories.length;

  return (
    <div className="story d-flex">
      {tot > 0 ? (
        stories.map((story) => (
          <div
            key={story.id}
            className="mx-1"
            onClick={() => navigate(`/stories/${story.id}/${tot}`)}
          >
            <div className="gradient-border">
              <img
                src={story.user.profilePic}   // FIXED
                alt="dp"
                className="story-dp rounded-circle"
              />
            </div>
            <p className="text-truncate" style={{ width: "50px" }}>
              {story.user.username}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Stories;
