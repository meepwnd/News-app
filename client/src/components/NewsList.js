import React from "react";
import NewsItem from './NewsItem'

const NewsList = ({ news, deleteItem, fetchNews, userData }) => {
  return (
    <div>
      {news.map(item => (
        <NewsItem key={item._id} item={item} deleteItem={deleteItem} fetchNews={fetchNews} creator={item.owner} userData={userData}/>
      ))}
    </div>
  );
};

export default NewsList;
