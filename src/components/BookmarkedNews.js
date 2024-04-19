import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NewsItem from './NewsItem'

const BookmarkedNews = () => {
  const context = useContext(noteContext);
  const { getBookmarkedNews, bookmarkedNews, getUser, deleteNews } = context;

  useEffect(() => {
    getBookmarkedNews();
    getUser();
  }, [])

  return (
    <>
      {
          <div className='row'>
            {bookmarkedNews.map((item, index) => {
              return (
                <div className='col-sm-4 overflow-hidden mt-2' key={index} style={{ height: '500px' }}>
                  <button onClick={() => { deleteNews(item._id) }}>delete item</button>
                  <NewsItem itemData={item} />
                </div>
              )
            })}
          </div>
      }
    </>
  )
}

export default BookmarkedNews