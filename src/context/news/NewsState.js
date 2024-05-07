import newsContext from "./newsContext";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const NewsState = (props) => {
  const host = "http://localhost:5000"

  const initialNews = []
  const [bookmarkedNews, setBookmarkedNews] = useState(initialNews);
  const [user, setUser] = useState('');
  const [isLoggedIn, setLogin] = useState(false);
  const [discussionMessageList, setDiscussionMessageList] = useState([]);

  // Reset all news when sign out
  const signOut = () => {
    setBookmarkedNews(initialNews);
    setUser('');
    setLogin(false);
    toast.error("You Logged Out!", { autoClose: 2000 });
  }

  // Get the User
  const getUser = async () => {
    if (localStorage.getItem('token')) {
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
  }

  // Get all News
  const getBookmarkedNews = async () => {
    // API Call 
    if (localStorage.getItem('token')) {
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

  // Add a News
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
      setBookmarkedNews(bookmarkedNews.concat(json.results));
      toast.success("News Bookmarked!", { autoClose: 1000 });
    }
    else alert('Cannot bookmark duplicate news!')
  }

  // Delete a News
  const deleteNews = async (id) => {
    // API Call
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
    <newsContext.Provider value={{
      bookmarkedNews, user, isLoggedIn, discussionMessageList,
      setDiscussionMessageList, addNews, deleteNews, getBookmarkedNews, signOut, getUser
    }}>
      {props.children}
    </newsContext.Provider>
  )

}
export default NewsState;