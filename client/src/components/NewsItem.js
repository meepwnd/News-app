import React from "react";
import { Link } from "react-router-dom";
import { removeItem } from "../api/news";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const NewsItem = ({ item, fetchNews, token, userData, creator }) => {
  const isEditable = userData._id === creator;
  return (
    <div key={item._id}>
      <div className="news-item">
        <Link to={`/news/${item._id}`} className="news-item__link">{item.title}</Link>
        <span hidden={!isEditable} className="news-item__icons">
          <button className="news-item__delete"
            onClick={() => {
              removeItem(item._id, fetchNews, token);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <Link to={`/news/${item._id}/edit`} className="news-item__edit">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </span>
      </div>

      {item.body.length > 180 ? (
        <p className="news-item__text">{item.body.substr(0, 180).trim()}...</p>
      ) : (
        <p className="news-item__text">{item.body}</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.user.data.token || ""
});

export default connect(mapStateToProps)(NewsItem);
