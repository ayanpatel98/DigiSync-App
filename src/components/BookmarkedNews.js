import React, { useContext, useEffect } from 'react'
import newsContext from '../context/news/newsContext'
import NewsItem from './NewsItem'

const BookmarkedNews = () => {
	const context = useContext(newsContext);
	const { getBookmarkedNews, bookmarkedNews, getUser } = context;

	useEffect(() => {
		// Get all bookmarked news
		getBookmarkedNews();
		getUser();
	}, [])

	return (
		<>
			{
				// Load all bookmarked news if there are bookmarks
				(bookmarkedNews && bookmarkedNews.length > 0)
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

export default BookmarkedNews;