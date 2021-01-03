import React from 'react';
import { ModalType } from '../../types';
import './style.css';

type Props = {
  type: ModalType;
  setIsModalOpen: (isOpen: boolean) => void;
  deleteNews: () => void;
};

const Modal: React.FC<Props> = ({ type, setIsModalOpen, deleteNews }) => {
  return (
    <article className='modal'>
      <div className='modal-card'>
        {type === ModalType.Add && (
          <div className='modal-action'>
            <h3>Add</h3>
          </div>
        )}
        {type === ModalType.Delete && (
          <div className='modal-action'>
            <h3>Do you want remove this news?</h3>
            <div className='modalcontrol'>
              <button className='btn modal-btn' onClick={deleteNews}>
                Yes
              </button>
              <button
                className='btn modal-btn'
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
export default Modal;
