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
            <div className='col-12'>
              <h2 className='text-center mt-3'>
                <b>Saved Bookmarks</b>
              </h2>
            </div>
            {bookmarkedNews.map((item, index) => {
              return (
                <div className='col-sm-4 overflow-hidden mt-2' key={index} style={{ height: '500px' }}>
                  <NewsItem itemData={item} />
                </div>
              )
            })}
          </div>
          :
          <div className='col-12'>
            <h2 className='text-center mt-3'>
              <b>No saved bookmarks</b>
            </h2>
          </div>
      }
    </>
  )
}

export default BookmarkedNews