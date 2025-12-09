import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewStory() {
  const { id, tot } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);

  // ❗ Redirect if id is out of range
  useEffect(() => {
    if (Number(id) <= 0 || Number(id) > Number(tot)) {
      navigate("/");
    }
  }, [id, tot, navigate]);

  // 🚀 Fetch the story
  useEffect(() => {
    fetch(`http://localhost:3001/stories/${id}`)
      .then((data) => data.json())
      .then((data) => setStory(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      {story ? (
        <div className="d-flex justify-content-center align-items-center gap-4">

          {/* LEFT ARROW */}
          <Link to={`http://localhost:5173/stories/${Number(id) - 1}/${tot}`}>
            <i className="bi bi-arrow-left-circle-fill fs-1"></i>
          </Link>

          {/* STORY IMAGE */}
          <img
            className="vh-100"
            src={story.image}
            alt="story"
          />

          {/* RIGHT ARROW */}
          <Link to={`http://localhost:5173/stories/${Number(id) + 1}/${tot}`}>
            <i className="bi bi-arrow-right-circle-fill fs-1"></i>
          </Link>

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ViewStory;
 