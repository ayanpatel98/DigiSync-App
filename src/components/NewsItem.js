import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import newsContext from '../context/news/newsContext';

const NewsItem = (props) => {
  const userContext = useContext(newsContext);
  const { isLoggedIn, addNews, deleteNews } = userContext;
  const location = useLocation();

  return (
    <div className="card overflow-hidden h-100">
      <div className={"h-50 position-relative card-img-top " + (isLoggedIn ? "image-wrapper" : "")}
        onClick={
          () => {
            if (isLoggedIn) {
              if (location.pathname == '/') {
                addNews(props.itemData)
              } else if (location.pathname == '/bookmarks') {
                deleteNews(props.itemData._id)
              }
            }
          }
        }
        role={(isLoggedIn) ? 'button' : ''}>
        <img className="h-100 w-100" src={props.itemData.urlToImage} alt="newsImage" />
        {
          (isLoggedIn)
            ?
            <div className="portfolio-info">
              <div className="portfolio-links">
                <a data-gall="portfolioDetailsGallery" data-vbtype="iframe" className="venobox vbox-item">
                  {
                    (() => {
                      if (location.pathname == '/') {
                        return <i className="bx bx-bookmark-plus" title='Bookmark News'></i>
                      }
                      else if (location.pathname == '/bookmarks') {
                        return <i className="bx bx-bookmark-minus" title='Remove News'></i>
                      }

                    })()
                  }
                </a>
              </div>
            </div>
            :
            <></>
        }
      </div>
      <div className='card-body position-relative'>
        <div className="mt-1 mb-1 card-title"><strong>{props.itemData.title}</strong></div>
        <p className='card-text'>{props.itemData.description}</p>
        <a href={props.itemData.url} target='_blank' className="btn btn-primary position-absolute" style={{ bottom: '5%' }}>Open News</a>
      </div>
    </div>
  )
}

export default NewsItem