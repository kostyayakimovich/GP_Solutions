import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Settings from '../../../assets/images/Settings_icon.png';
import Up from '../../../assets/images/up_icon.png';
import { EXIT_USER, REMOVE_USER } from '../../../reducers/types';
import './style.css';

type Props = {
  userName: string;
  setUserName: (name: string) => void;
};

const UserPanel: React.FC<Props> = ({ userName, setUserName }) => {
  const dispatch = useDispatch();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const handleSettingsClick = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [setIsOpenDropdown, isOpenDropdown]);
  const handleDeleteUser = useCallback(() => {
    dispatch({
      type: REMOVE_USER,
      payload: userName,
    });
    setUserName('');
  }, [dispatch, userName, setUserName]);
  const handleExitUser = useCallback(() => {
    dispatch({
      type: EXIT_USER,
      payload: userName,
    });
    setUserName('');
  }, [dispatch, userName, setUserName]);

  return (
    <div className='user-panel'>
      <div className='login-links user-panel-nav'>
        <p>{userName}</p>
        <img
          className='icon-settings'
          src={Settings}
          alt='settings'
          onClick={handleSettingsClick}
        ></img>
      </div>
      {isOpenDropdown && (
        <div className='dropdown-content'>
          <p onClick={handleExitUser}>Exit</p>
          <p onClick={handleDeleteUser}>Delete user</p>
          <img
            className='up-icon'
            src={Up}
            alt='up'
            onClick={handleSettingsClick}
          ></img>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
