import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import NoteBook from './components/Notebook';
import BookmarkedNews from './components/BookmarkedNews';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Welcome to the NoteBook" />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/notebook">
                {/* <Home /> */}
                <NoteBook />
              </Route>
              <Route exact path="/bookmarks">
                <BookmarkedNews/>
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
