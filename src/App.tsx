import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Headline from './components/Headline';
import Modal from './components/Modal';
import News from './components/News';
import { ModalType, CurrentNews } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<CurrentNews | null>(null);
  const [modalType, setModalType] = useState(ModalType.Add);

  const closeModal = () => setIsModalOpen(false);

  const openModal = (current: CurrentNews, type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
    setCurrentNews(current);
  };

  return (
    <div className='App'>
      <Header setIsModalOpen={setIsModalOpen} setModalType={setModalType} />
      <Headline />
      <News openModal={openModal} />
      {isModalOpen && (
        <Modal
          type={modalType}
          closeModal={closeModal}
          currentNews={currentNews}
        />
      )}
    </div>
  );
}

export default App;
