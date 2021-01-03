import React, { useState } from 'react';
import { ModalType } from '../../types';
import './style.css';

type Props = {
  type: ModalType;
  setIsModalOpen: (isOpen: boolean) => void;
  deleteNews: () => void;
  addNews: (title: string, body: string) => void;
};

const Modal: React.FC<Props> = ({
  type,
  setIsModalOpen,
  deleteNews,
  addNews,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleAdd = () => {
    addNews(title, description);
    setIsModalOpen(false);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <article className='modal'>
      <div className='modal-card'>
        {type === ModalType.Add && (
          <div className='modal-action'>
            <p>
              <input
                name='title'
                type='text'
                className='modal-input'
                placeholder='Title news'
                id='title'
                onChange={handleChangeTitle}
              />
            </p>
            <p>
              <textarea
                name='text'
                className='modal-input modal-text'
                id='description'
                placeholder='Description news'
                onChange={handleChangeDescription}
              ></textarea>
            </p>
            <div className='modal-control'>
              <button className='btn' onClick={handleAdd}>
                Add news
              </button>
              <button className='btn' onClick={() => setIsModalOpen(false)}>
                Exit
              </button>
            </div>
          </div>
        )}
        {type === ModalType.Delete && (
          <div className='modal-action'>
            <h3>Do you want remove this news?</h3>
            <div className='modal-control'>
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
        {type === ModalType.Edit && (
          <div className='modal-action'>
            <h3>Update</h3>
            <div className='modal-control'>
              <button className='btn modal-btn'>Update</button>
              <button
                className='btn modal-btn'
                onClick={() => setIsModalOpen(false)}
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
export default Modal;
