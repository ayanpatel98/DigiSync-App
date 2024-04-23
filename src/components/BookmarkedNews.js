import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NewsItem from './NewsItem'

const BookmarkedNews = () => {
  const context = useContext(noteContext);
  const { getBookmarkedNews, bookmarkedNews, getUser } = context;

  useEffect(() => {
    getBookmarkedNews();
    getUser();
  }, [])

  return (
    <>
      {
        (bookmarkedNews.length > 0)
          ?
          <div className='row'>
            {bookmarkedNews.map((item, index) => {
              return (
                <div className='col-sm-4 overflow-hidden mt-2' key={index} style={{ height: '500px' }}>
                  <NewsItem itemData={item} />
                </div>
              )
            })}
          </div>
          :
          <h1>No saved bookmarks!</h1>
      }
    </>
  )
}

export default BookmarkedNews