import newsContext from "./newsContext";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const NewsState = (props) => { 
	
	const host = "http://18.144.79.186:5000"; // Backend URL
	const initialNews = []; // news list for bookmarks
	const [bookmarkedNews, setBookmarkedNews] = useState(initialNews);
	const [user, setUser] = useState(''); // get user name
	const [isLoggedIn, setLogin] = useState(localStorage.getItem('token') ? true : false); // get login status
	const [discussionMessageList, setDiscussionMessageList] = useState([]); // chat box messages

	// Reset all common values when sign out
	const signOut = () => {
		setBookmarkedNews(initialNews);
		setUser('');
		setLogin(false);
        localStorage.removeItem('token'); // remove the auth token
		toast.error("You Logged Out!", { autoClose: 2000 });
	}

	// Get the User details based on the login status
	const getUser = async () => {
		const response = await fetch(`${host}/api/auth/getuser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json();
		setUser(json.name);
		setLogin(true);
	}

	// Get all bookmarked news list for the current loggedin user
	const getBookmarkedNews = async () => {
		if (isLoggedIn) {
			const response = await fetch(`${host}/api/news/fetchallnews`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token')
				}
			});
			const json = await response.json();
			setBookmarkedNews(json);
		}
	}

	// Add a News to be bookmarked for a loggedin user
	const addNews = async (newsItem) => {
		const { author, title, description, url, urlToImage, publishedAt, content } = newsItem;
		const response = await fetch(`${host}/api/news/addnews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ author, title, description, url, urlToImage, publishedAt, content })
		});

		const json = await response.json();
		if (json.status == 200) {
			// add the response to the current bookmarks list
			setBookmarkedNews(bookmarkedNews.concat(json.results));
			toast.success("News Bookmarked!", { autoClose: 1000 });
		}
		else alert('Cannot bookmark duplicate news!')
	}

	// Delete a bookmarked news for a loggedin user
	const deleteNews = async (id) => {
		const response = await fetch(`${host}/api/news/deletenews/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = await response.json();
		if (json.status == 200) {
			const newNews = bookmarkedNews.filter((news) => { return news._id !== id })
			setBookmarkedNews(newNews);
			toast.error("News Deleted!", { autoClose: 1000 });
		}
	}

	return (
		// Provide the context
		<newsContext.Provider value={{
			bookmarkedNews, user, isLoggedIn, discussionMessageList,
			setDiscussionMessageList, addNews, deleteNews, getBookmarkedNews, signOut, getUser
		}}>
			{props.children}
		</newsContext.Provider>
	)

}
export default NewsState;