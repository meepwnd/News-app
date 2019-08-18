import React, { useState } from "react";

const AddNewsForm = ({ postNews, token }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    if (title && body) {
      postNews(title, body, token);

      setTitle("");
      setBody("");
    } else {
      alert("Please provide the title and the body");
    }
  };

  return (
    <div className="add-news">
      <h4 className="add-news__heading">Tell us something</h4>
      <form onSubmit={onSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="add-news__title"
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="News Content"
          className="add-news__body"
        />
        <button disabled={!token} className="btn-submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddNewsForm;
