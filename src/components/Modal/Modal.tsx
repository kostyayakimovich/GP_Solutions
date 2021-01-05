import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { ModalType, CurrentNews, Payload } from '../../types';
import AddForm from '../AddForm';
import './style.css';
import Button from '../Button';

type Props = {
  type: ModalType;
  closeModal: () => void;
  currentNews: CurrentNews | null;
};

const Modal: React.FC<Props> = ({ type, closeModal, currentNews }) => {
  const dispatch = useDispatch();
  const handleAdd = useCallback(
    (payload: Payload) => {
      dispatch({ type: 'ADD', payload: { ...payload, id: uuidv4() } });
      closeModal();
    },
    [closeModal, dispatch]
  );

  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE', payload: currentNews });
    closeModal();
  }, [currentNews, closeModal, dispatch]);

  const handleEdit = useCallback(
    (payload: Payload) => {
      dispatch({ type: 'EDIT', payload: { ...payload, id: currentNews?.id } });
      closeModal();
    },
    [closeModal, dispatch, currentNews]
  );

  return (
    <article className='modal'>
      <div className='modal-card'>
        {type === ModalType.Add && (
          <AddForm
            onSubmit={handleAdd}
            onClose={closeModal}
            buttonName='Add news'
            titleValue=''
            bodyValue=''
          />
        )}
        {type === ModalType.Edit && (
          <AddForm
            onSubmit={handleEdit}
            onClose={closeModal}
            buttonName='Edit news'
            titleValue={currentNews?.title || ''}
            bodyValue={currentNews?.body || ''}
          />
        )}
        {type === ModalType.Delete && (
          <div className='modal-action'>
            <h3>Do you want remove this news?</h3>
            <div className='modal-control'>
              <Button buttonName='Yes' onClick={handleDelete} />
              <Button buttonName='No' onClick={closeModal} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Modal;
