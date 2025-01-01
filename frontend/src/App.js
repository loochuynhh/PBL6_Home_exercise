// App.js
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './pages/account/AuthContext';
import FloatingChatbot from './components/Chatbot'; 

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const chatbotRoutes = ['/product', '/workout', '/exercise', '/'];
  const shouldShowChatbot = chatbotRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <AuthProvider>
      <div className='flex flex-col min-h-screen'>
        <ToastContainer />
        {!isAdminRoute && <Header />}
        <main className='flex-1'>
          <Outlet />
        </main>
        {shouldShowChatbot && <FloatingChatbot />} 
        {!isAdminRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
