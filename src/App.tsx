import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
import News from './components/News';
import { dataNews } from './components/News/dataNews';
import { ModalType } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [news, setNews] = useState(dataNews);
  const [modalType, setModalType] = useState(ModalType.Add);
  return (
    <div className='App'>
      <Header />
      <News
        setIsModalOpen={setIsModalOpen}
        news={news}
        setModalType={setModalType}
      />
      {isModalOpen && <Modal type={modalType} />}
    </div>
  );
}

export default App;
