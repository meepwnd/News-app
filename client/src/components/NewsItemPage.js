import React from "react";
import { connect } from "react-redux";
import { removeItem } from "../api/news";

const NewsItemPage = props => {
  const isEditable = props.userData._id === props.newsItem.owner;
  return (
    <div className="container">
      <p>{isEditable}</p>
      <h3>{props.newsItem.title}</h3>
      <p>{props.newsItem.body}</p>
      <div hidden={!isEditable}>
        <button
          onClick={() => props.history.push(`/news/${props.newsItem._id}/edit`)}
        >
          update
        </button>
        <button
          onClick={() => {
            removeItem(
              props.newsItem._id,
              () => {
                props.history.push("/news");
              },
              props.token
            );
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  newsItem: state.news.data.find(item => item._id === props.match.params.id),
  token: state.user.data.token || "",
  userData: state.user.data.user || {}
});

export default connect(mapStateToProps)(NewsItemPage);
