import React, { useState } from "react";
import { Link } from "react-router-dom";
import { removeItem } from "../api/news";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const NewsItem = ({ item, fetchNews, token, userData, creator }) => {
  const [isModalOpen, toggleModal] = useState(false);
  const isEditable = userData._id === creator;
  return (
    <div key={item._id}>
      <div className="news-item">
        <Link to={`/news/${item._id}`} className="news-item__link">
          {item.title}
        </Link>
        <span hidden={!isEditable} className="news-item__icons">
          <button
            className="news-item__delete"
            onClick={() => toggleModal(!isModalOpen)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <Link to={`/news/${item._id}/edit`} className="news-item__edit">
            <FontAwesomeIcon icon={faEdit} />
          </Link>

          {isModalOpen && (
            <Modal>
              <div className="modal-overlay">
                <div className="modal-body">
                  <div className="modal-header">
                    <h1>Are you really want to delete this newsitem?</h1>
                  </div>
                  <button
                    className="btn_confirm"
                    onClick={() => {
                      removeItem(item._id, fetchNews, token);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn_cancel"
                    onClick={() => toggleModal(!isModalOpen)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          )}
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
