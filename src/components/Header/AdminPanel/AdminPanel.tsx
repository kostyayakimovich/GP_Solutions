import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AdminModalType } from '../../../types';
import { getDataRss } from '../../../actions';
import './style.css';

type Props = {
  openAdminModal: (type: AdminModalType) => void;
  setIsOpenDropdown: (isOpen: boolean) => void;
  isOpenDropdown: boolean;
};

const AdminPanel: React.FC<Props> = ({
  openAdminModal,
  setIsOpenDropdown,
  isOpenDropdown,
}) => {
  const dispatch = useDispatch();

  const urlHabr = 'https://habr.com/ru/rss/hubs/all/';
  const urlTut = 'https://news.tut.by/rss/it.rss';

  const handleApproveClick = useCallback(() => {
    openAdminModal(AdminModalType.ApproveNews);
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown, openAdminModal, setIsOpenDropdown]);

  const handleAddTut = useCallback(() => {
    getDataRss(dispatch, urlTut);
    openAdminModal(AdminModalType.AddTut);
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown, openAdminModal, setIsOpenDropdown, dispatch]);

  const handleAddHabr = useCallback(() => {
    getDataRss(dispatch, urlHabr);
    openAdminModal(AdminModalType.addHabr);
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown, openAdminModal, setIsOpenDropdown, dispatch]);

  return (
    <>
      <p onClick={handleApproveClick}>Unapproved news</p>
      <p onClick={handleAddTut}>RSS tut.by</p>
      <p onClick={handleAddHabr}>RSS habr.com</p>
    </>
  );
};

export default AdminPanel;
