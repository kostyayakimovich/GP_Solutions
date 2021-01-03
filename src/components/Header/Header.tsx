import React, { useCallback, useState } from 'react';
import Search from '../../assets/images/search.png';
import { ModalType } from '../../types';
import './style.css';

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: ModalType) => void;
};
const Header: React.FC<Props> = ({ setIsModalOpen, setModalType }) => {
  const [valueInput, setValueInput] = useState('');

  const handleKeyUpInput = useCallback((event) => {
    setValueInput(event.target.value);
  }, []);
  const handleAdd = () => {
    setModalType(ModalType.Add);
    setIsModalOpen(true);
  };

  return (
    <header className='header'>
      <h1 className='logo'>GP Solutuons News</h1>
      <div className='search'>
        <div className='input-wrapper' data-text={valueInput}>
          <input
            className='input-header'
            type='text'
            placeholder='Find news…'
            onKeyUp={handleKeyUpInput}
          />
        </div>
        <div className='search-icon-wrapper'>
          <img className='search-icon' src={Search} alt='search' />
        </div>
      </div>
      <button className='btn' onClick={() => handleAdd()}>
        Add news
      </button>
    </header>
  );
};
export default Header;
