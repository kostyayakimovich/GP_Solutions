import React, { useCallback, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Headline from './components/Headline';
import Modal from './components/Modal';
import News from './components/News';
import Register from './components/Login';
import { NewsModalType, CurrentNews, LoginModalType } from './types';

function App() {
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<CurrentNews | null>(null);
  const [newsModalType, setNewsModalType] = useState(NewsModalType.Add);
  const [loginModalType, setLoginModalType] = useState(LoginModalType.Create);

  const closeNewsModal = useCallback(() => setIsNewsModalOpen(false), []);

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
        <Register closeLoginModal={closeLoginModal} type={loginModalType} />
      )}
    </div>
  );
}

export default App;
