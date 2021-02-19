import React, { useCallback, useState } from 'react';
import Header from './components/Header';
import Headline from './components/Headline';
import Modal from './components/Modal';
import News from './components/News';
import './App.css';

import {
  NewsModalType,
  CurrentNews,
  LoginModalType,
  AdminModalType,
} from './types';
import Login from './components/Login';
import AdminModal from './components/AdminModal';
function App() {
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<CurrentNews | null>(null);
  const [newsModalType, setNewsModalType] = useState(NewsModalType.Add);
  const [loginModalType, setLoginModalType] = useState(LoginModalType.Create);
  const [adminModalType, setAdminModalType] = useState(
    AdminModalType.ApproveNews
  );
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const closeNewsModal = useCallback(() => setIsNewsModalOpen(false), []);
  const closeAdminModal = useCallback(() => setIsAdminModalOpen(false), []);
  const openNewsModal = useCallback(
    (current: CurrentNews, type: NewsModalType) => {
      setNewsModalType(type);
      setIsNewsModalOpen(true);
      setCurrentNews(current);
    },
    []
  );
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);
  const openLoginModal = useCallback((type: LoginModalType) => {
    setLoginModalType(type);
    setIsLoginModalOpen(true);
  }, []);

  return (
    <div className='App'>
      <Header
        setIsNewsModalOpen={setIsNewsModalOpen}
        setNewsModalType={setNewsModalType}
        openLoginModal={openLoginModal}
        type={loginModalType}
        setIsAdminModalOpen={setIsAdminModalOpen}
        setAdminModalType={setAdminModalType}
      />
      <Headline />
      <News openNewsModal={openNewsModal} />
      {isNewsModalOpen && (
        <Modal
          type={newsModalType}
          closeNewsModal={closeNewsModal}
          currentNews={currentNews}
        />
      )}
      {isLoginModalOpen && (
        <Login closeLoginModal={closeLoginModal} type={loginModalType} />
      )}
      {isAdminModalOpen && (
        <AdminModal closeAdminModal={closeAdminModal} type={adminModalType} />
      )}
    </div>
  );
}

export default App;
