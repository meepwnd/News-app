import React, {  useEffect } from "react";
import {connect} from 'react-redux'
import AddNewsForm from "./AddNewsForm";
import NewsList from "./NewsList";
import {fetchNews} from '../actions/actions'
import axios from 'axios'

const NewsPage = ({news, fetchNews, token, userData}) => {
  const postNews = async (title, body, token) => {
    try {
      await axios.post("/news", { title, body }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      fetchNews()
    } catch(e){
      console.log(e)
    } 
  }

  useEffect(() => {
    fetchNews();
  }, [fetchNews])

  return (
    <div className="container">
      <AddNewsForm postNews={postNews} token={token} />
      <h1>News:</h1>
      {news.isFetching && <p>Loading...</p>}
      {news.error ? <p>{news.error}</p> : <NewsList news={news.data} fetchNews={fetchNews} userData={userData}/>}
      
    </div>
  );
};

const mapStateToProps = state => ({
  news: state.news,
  token: state.user.data.token || '',
  userData: state.user.data.user || {}
})

export default connect(mapStateToProps, {fetchNews})(NewsPage);
