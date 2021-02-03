import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Search from '../../assets/images/search.png';
import Close from '../../assets/images/close.png';
import { ModalType, RegisterType } from '../../types';
import { SEARCH } from '../../reducers/types';
import Button from '../Button';
import LoginLinks from './LoginLinks';
import './style.css';
import UserPanel from './UserPanel';

type State = {
  searchString: string;
  currentUser: string;
};

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: ModalType) => void;
  openRegister: (type: RegisterType) => void;
  type: RegisterType;
};

const Header: React.FC<Props> = ({
  setIsModalOpen,
  setModalType,
  openRegister,
}) => {
  const [valueInput, setValueInput] = useState('');
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  const handleKeyUpInput = useCallback((event) => {
    setValueInput(event.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    setModalType(ModalType.Add);
    setIsModalOpen(true);
  }, [setIsModalOpen, setModalType]);

  const searchString = useSelector((state: State) => state.searchString);
  const loginUser = useSelector((state: State) => state.currentUser);

  useEffect(() => {
    setUserName(loginUser);
  }, [loginUser]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        dispatch({ type: SEARCH, payload: valueInput });
      }
    },
    [valueInput, dispatch]
  );
  const handleFindClick = useCallback(() => {
    dispatch({ type: SEARCH, payload: valueInput });
  }, [dispatch, valueInput]);

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueInput(event.target.value);
    },
    []
  );

  const handleClearSearchClick = useCallback(() => {
    setValueInput('');
    dispatch({ type: SEARCH, payload: '' });
  }, [dispatch]);

  return (
    <>
      <header className='header'>
        <h1 className='logo'>GP Solutions News</h1>
        <div className='search'>
          <div className='input-wrapper' data-text={valueInput}>
            <input
              value={valueInput}
              className='input-header'
              type='text'
              placeholder='Find news…'
              onKeyUp={handleKeyUpInput}
              onKeyPress={handleKeyPress}
              onChange={handleChangeInput}
            />
          </div>
          <div className='search-icon-wrapper'>
            <img
              className='search-icon'
              src={Search}
              alt='search'
              onClick={handleFindClick}
            />
          </div>
        </div>
        {userName && (
          <Button buttonName='Add news' onClick={handleAdd} typeBtn='button' />
        )}
        {userName ? (
          <UserPanel userName={userName} setUserName={setUserName} />
        ) : (
          <LoginLinks openRegister={openRegister} />
        )}
      </header>
      {searchString && (
        <div className='message'>
          <p>Results for: {searchString}</p>
          <img
            className='close-icon'
            src={Close}
            alt='close'
            onClick={handleClearSearchClick}
          />
        </div>
      )}
    </>
  );
};
export default Header;
