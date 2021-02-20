import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Settings from '../../../assets/images/Settings_icon.png';
import Up from '../../../assets/images/up_icon.png';
import { EXIT_USER, REMOVE_USER } from '../../../reducers/types';
import { AdminModalType } from '../../../types';
import AdminPanel from '../AdminPanel';
import './style.css';

type Props = {
  userName: string;
  setUserName: (name: string) => void;
  openAdminModal: (type: AdminModalType) => void;
};

const UserPanel: React.FC<Props> = ({
  userName,
  setUserName,
  openAdminModal,
}) => {
  const dispatch = useDispatch();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const handleSettingsClick = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [setIsOpenDropdown, isOpenDropdown]);
  const handleDeleteUser = useCallback(() => {
    localStorage.clear();
    dispatch({
      type: REMOVE_USER,
      payload: userName,
    });
    setUserName('');
  }, [dispatch, userName, setUserName]);
  const handleExitUser = useCallback(() => {
    dispatch({
      type: EXIT_USER,
      payload: null,
    });
    setUserName('');
  }, [dispatch, setUserName]);

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
          {userName === 'Admin' && (
            <AdminPanel
              openAdminModal={openAdminModal}
              setIsOpenDropdown={setIsOpenDropdown}
              isOpenDropdown={isOpenDropdown}
            />
          )}
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
