import React from 'react';
import { ModalType } from '../../types';
import './style.css';

type Props = {
  type: ModalType;
};

const Modal: React.FC<Props> = ({ type }) => {
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
              <button className='btn modal-btn'>Yes</button>
              <button className='btn modal-btn'>No</button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
export default Modal;
