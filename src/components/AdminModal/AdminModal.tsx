import React, { useCallback } from 'react';
import Close from '../../assets/images/close.png';
import Approve from '../../assets/images/Approve.png';
import { useDispatch, useSelector } from 'react-redux';
import { AdminModalType, CurrentNews, Payload } from '../../types';
import Button from '../Button';
import {
  APPROVE_NEWS,
  REJECT_NEWS,
  CHANGE_ALL_NEWS,
} from '../../reducers/types';
import './style.css';

type Props = { closeAdminModal: () => void; type: AdminModalType };
type State = {
  unapprovedNews: CurrentNews[];
};
const AdminModal: React.FC<Props> = ({ type, closeAdminModal }) => {
  const dispatch = useDispatch();
  const message = 'No unapproved news';
  const unapprovedNews = useSelector((state: State) => state.unapprovedNews);

  const handleApprove = useCallback(
    (payload: Payload) => {
      dispatch({
        type: APPROVE_NEWS,
        payload: { ...payload },
      });
    },
    [dispatch]
  );
  const handleReject = useCallback(
    (payload: Payload) => {
      dispatch({
        type: REJECT_NEWS,
        payload: { ...payload },
      });
    },
    [dispatch]
  );
  const handleApproveAll = useCallback(() => {
    dispatch({
      type: CHANGE_ALL_NEWS,
      payload: true,
    });
  }, [dispatch]);
  const handleRejectAll = useCallback(() => {
    dispatch({
      type: CHANGE_ALL_NEWS,
      payload: false,
    });
  }, [dispatch]);

  return (
    <>
      {type === AdminModalType.AddTut || type === AdminModalType.addHabr ? (
        <article className='modal'>
          <div className='modal-card admin-card admin-card-rss'>
            <div className='modal-action  '>
              <h1>RSS news added to section Unappruved news</h1>
              <div className='modal-admin-control'>
                <Button
                  buttonName='Exit'
                  typeBtn='button'
                  onClick={closeAdminModal}
                />
              </div>
            </div>
          </div>
        </article>
      ) : (
        <article className='modal  '>
          <div className='modal-card admin-card'>
            <div className='modal-action  '>
              <h3>Select news to add</h3>
              <div className='modal-admin-control fixed-admin-control'>
                <Button
                  buttonName='Add all'
                  typeBtn='button'
                  onClick={handleApproveAll}
                />
                <Button
                  buttonName='Remove all'
                  typeBtn='button'
                  onClick={handleRejectAll}
                />
                <Button
                  buttonName='Exit'
                  typeBtn='button'
                  onClick={closeAdminModal}
                />
              </div>
              {unapprovedNews.length &&
                unapprovedNews.map((item) => {
                  return (
                    <div className='modal-admin-content' key={item.id}>
                      <div className='modal-admin-news'>
                        <p className='title-admin-news'>{item.title}</p>
                        <div
                          className='text-admin-news'
                          dangerouslySetInnerHTML={{ __html: item.body }}
                        ></div>
                        <div className='info-news'>
                          <p className='author-news'>{item.author}</p>
                          <p className='date-news'>{item.dateCreate}</p>
                        </div>
                      </div>

                      <div className='modal-admin-control'>
                        <img
                          className='approve-icon-admin'
                          src={Approve}
                          alt='approve'
                          onClick={() => handleApprove(item)}
                        />
                        <img
                          className='close-icon-admin'
                          src={Close}
                          alt='close'
                          onClick={() => handleReject(item)}
                        />
                      </div>
                    </div>
                  );
                })}
              {!unapprovedNews.length && (
                <div className='modal-admin-content'>
                  <p>{message}</p>
                </div>
              )}
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default AdminModal;
