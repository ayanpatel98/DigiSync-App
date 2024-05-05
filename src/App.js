import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewsState from './context/news/NewsState';
import Signup from './components/Signup';
import Login from './components/Login';
import BookmarkedNews from './components/BookmarkedNews';

function App() {
  return (
    <>
      <NewsState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
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
      </NewsState>
    </>
  );
}

export default App;
