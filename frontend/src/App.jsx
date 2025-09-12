import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import MainPage from './Page/MainPage/MainPage';
import About from './Page/About/About';
import Board from './Page/Board/Board';
import Contact from './Page/Contact/Contact';
import Leadership from './Page/Leadership/Leadership';
import Services from './Page/Services/Services';
import AdminLogin from './Page/Admin/AdminLogin';
import { useEffect, useState } from 'react';

function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/verify-token', {}, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        console.log('토큰 인증 실패: ', error);
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/admin/posts" replace /> : <Outlet />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/board',
        element: <Board />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/leadership',
        element: <Leadership />,
      },
      {
        path: '/our-services',
        element: <Services />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AuthRedirectRoute />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
