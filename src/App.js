import './App.css';
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewsState from './context/news/NewsState';
import BookmarkedNews from './components/BookmarkedNews';
import NewsDiscussion from './components/NewsDiscussion';
import PrivateRoutes from './components/PrivateRoutes';

const App = () => {

	return (
		<>
			<NewsState>
				<Router>
					<Navbar />
					<div className="container">
						<Routes>
							<Route exact path="/" element={<Home />} />
							{/* Route Protector */}
							<Route element={<PrivateRoutes />}>
								<Route exact path='/bookmarks' element={<BookmarkedNews />} />
								<Route exact path='/discussion' element={<NewsDiscussion />} />
							</Route>
							<Route path="*" element={<Navigate to='/' replace/>} />
						</Routes>
					</div>
				</Router>
			</NewsState>
		</>
	);
}

export default App;
