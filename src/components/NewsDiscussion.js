import React, { useContext, useEffect } from 'react';
import newsContext from '../context/news/newsContext';

const NewsDiscussion = () => {
    const context = useContext(newsContext);
    const { getUser } = context;

    useEffect(() => {
      getUser();
    }, [])

    return (
        <div>NewsDiscussion</div>
    )
}

export default NewsDiscussion;
