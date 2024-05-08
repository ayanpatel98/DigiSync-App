import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import newsContext from '../context/news/newsContext';

const PrivateRoutes = () => {
    const context = useContext(newsContext);
    const { isLoggedIn } = context;

    return (
        // Decide permission
        (isLoggedIn) ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes;