import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const UpdateItemPage = props => {
  console.log(props.newsItem);
  const [title, setTitle] = useState(props.newsItem.title);
  const [body, setBody] = useState(props.newsItem.body);

  const updateItem = async (title, body, token) => {
    try {
      await axios.patch(
        `/news/${props.newsItem._id}`,
        { title, body },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      props.history.push("/news");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <form>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={body} onChange={e => setBody(e.target.value)} />
      </form>
      <div className="btn-group">
        <button
          onClick={() => updateItem(title, body, props.token)}
          className="btn-submit"
        >
          update
        </button>
        <button
          onClick={() => props.history.push("/news")}
          className="btn-cancel"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  newsItem: state.news.data.find(item => item._id === props.match.params.id),
  token: state.user.data.token || ""
});

export default connect(mapStateToProps)(UpdateItemPage);
