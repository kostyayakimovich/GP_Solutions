import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Headline from './components/Headline';
import Modal from './components/Modal';
import News from './components/News';
import Register from './components/Register';
import { ModalType, CurrentNews, RegisterType } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<CurrentNews | null>(null);
  const [modalType, setModalType] = useState(ModalType.Add);
  const [registerType, setRegisterType] = useState(RegisterType.Login);

  const closeModal = () => setIsModalOpen(false);

  const openModal = (current: CurrentNews, type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
    setCurrentNews(current);
  };
  const closeRegister = () => setIsRegisterOpen(false);
  const openRegister = (type: RegisterType) => {
    setRegisterType(type);
    setIsRegisterOpen(true);
  };

  return (
    <div className='App'>
      <Header
        setIsModalOpen={setIsModalOpen}
        setModalType={setModalType}
        openRegister={openRegister}
        type={registerType}
      />
      <Headline />
      <News openModal={openModal} />
      {isModalOpen && (
        <Modal
          type={modalType}
          closeModal={closeModal}
          currentNews={currentNews}
        />
      )}
      {isRegisterOpen && (
        <Register closeRegister={closeRegister} type={registerType} />
      )}
    </div>
  );
}

export default App;
