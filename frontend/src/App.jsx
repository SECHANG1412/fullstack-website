import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainPage from './Page/MainPage/MainPage';
import About from './Page/About/About';
import Board from './Page/Board/Board';
import Contact from './Page/Contact/Contact';
import Leadership from './Page/Leadership/Leadership';
import Services from './Page/Services/Services';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
