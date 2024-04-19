import React from 'react'

const NewsItem = (props) => {
  return (
        <div className="h-100 position-relative">
            <div className="h-50">
                <img className="h-100 w-100" src={props.itemData.urlToImage} alt="newsImage"/>
            </div>
            <div className='position-absolute' style={{bottom:'10%'}}>
              <div className="mt-1 mb-1"><strong>{props.itemData.title}</strong></div>
              <div>{props.itemData.description}</div>
            </div>
        </div>
  )
}

export default NewsItem