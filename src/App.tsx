import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
import News from './components/News';
import { dataNews } from './assets/data/dataNews';
import { ModalType } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [news, setNews] = useState(dataNews);
  const [modalType, setModalType] = useState(ModalType.Add);
  const [titleNews, setTitleNews] = useState('');

  const deleteNews = () => {
    const changedNews = news.filter((item) => item.title !== titleNews);
    setNews(changedNews);
    setIsModalOpen(false);
  };

  return (
    <div className='App'>
      <Header />
      <News
        setIsModalOpen={setIsModalOpen}
        news={news}
        setModalType={setModalType}
        setTitleNews={setTitleNews}
      />
      {isModalOpen && (
        <Modal
          type={modalType}
          setIsModalOpen={setIsModalOpen}
          deleteNews={deleteNews}
        />
      )}
    </div>
  );
}

export default App;
