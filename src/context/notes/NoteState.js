import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  const initialNews = []
  const [bookmarkedNews, setBookmarkedNews] = useState(initialNews);
  const [user, setUser] = useState('');
  const [isLoggedIn, setLogin] = useState(false);

  // Reset all notes when sign out
  const signOut = () => {
    setNotes(notesInitial);
    setBookmarkedNews(initialNews);
    setUser('');
    setLogin(false)
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
    // TODO: API Call
    // API Call 
    const {author, title, description, url, urlToImage, publishedAt, content} = newsItem;
    const response = await fetch(`${host}/api/news/addnews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({author, title, description, url, urlToImage, publishedAt, content})
    });

    const json = await response.json();
    setBookmarkedNews(bookmarkedNews.concat(json))
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
    const newNews = bookmarkedNews.filter((news) => { return news._id !== id })
    setBookmarkedNews(newNews)
  }

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    if (localStorage.getItem('token')) {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json()
      setNotes(json)
    }
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{
      notes, bookmarkedNews, user, isLoggedIn,
      addNote, deleteNote, addNews, deleteNews, editNote, getNotes, getBookmarkedNews, signOut, getUser
    }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;