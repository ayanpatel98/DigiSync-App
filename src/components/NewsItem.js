import React from 'react'

const NewsItem = (props) => {
  return (
        <div className="m-3 border-2 border-solid border-gray inline-block h-96 lg:w-96 md:w-1/2 sm:w-full
        text-ellipsis overflow-hidden">
            <div className="h-2/3">
                <img className="h-full w-full" src={props.itemData.urlToImage} alt="newsImage"/>
            </div>
            <div className="mt-1 mb-1"><strong>{props.itemData.title}</strong></div>
            <div>{props.itemData.description}</div>
        </div>
  )
}

export default NewsItem