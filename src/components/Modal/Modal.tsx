import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { NewsModalType, CurrentNews, Payload } from '../../types';
import AddForm from '../AddForm';
import Button from '../Button';
import { ADD, DELETE, EDIT } from '../../reducers/types';
import './style.css';

type Props = {
  type: NewsModalType;
  closeNewsModal: () => void;
  currentNews: CurrentNews | null;
};

const Modal: React.FC<Props> = ({ type, closeNewsModal, currentNews }) => {
  const dispatch = useDispatch();
  const getDate = () => moment().format('dddd MMMM D, h:mm:ss');
  const handleAdd = useCallback(
    (payload: Payload) => {
      dispatch({
        type: ADD,
        payload: { ...payload, id: uuidv4(), dateCreate: getDate() },
      });
      closeNewsModal();
    },
    [closeNewsModal, dispatch]
  );

  const handleDelete = useCallback(() => {
    dispatch({ type: DELETE, payload: currentNews });
    closeNewsModal();
  }, [currentNews, closeNewsModal, dispatch]);

  const handleEdit = useCallback(
    (payload: Payload) => {
      dispatch({ type: EDIT, payload: { ...payload, id: currentNews?.id } });
      closeNewsModal();
    },
    [closeNewsModal, dispatch, currentNews]
  );

  return (
    <article className='modal'>
      <div className='modal-card'>
        {type === NewsModalType.Add && (
          <AddForm
            onSubmit={handleAdd}
            onClose={closeNewsModal}
            buttonName='Add news'
            titleValue=''
            bodyValue=''
            authorValue=''
          />
        )}
        {type === NewsModalType.Edit && (
          <AddForm
            onSubmit={handleEdit}
            onClose={closeNewsModal}
            buttonName='Edit news'
            titleValue={currentNews?.title || ''}
            bodyValue={currentNews?.body || ''}
            authorValue={currentNews?.author || ''}
          />
        )}
        {type === NewsModalType.Delete && (
          <div className='modal-action'>
            <h3>Do you want remove this news?</h3>
            <div className='modal-control'>
              <Button
                buttonName='Yes'
                typeBtn='button'
                onClick={handleDelete}
              />
              <Button
                buttonName='No'
                typeBtn='button'
                onClick={closeNewsModal}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Modal;
