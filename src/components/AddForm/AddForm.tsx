import React, { useState } from 'react';

import { Payload } from '../../types';

import './style.css';

type Props = {
  onSubmit: (payload: Payload) => void;
  onClose: () => void;
  titleValue: string;
  bodyValue: string;
};

const AddForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  titleValue,
  bodyValue,
}) => {
  const [title, setTitle] = useState(titleValue);
  const [body, setDescription] = useState(bodyValue);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };
  return (
    <div className='modal-action'>
      <p>
        <input
          name='title'
          type='text'
          className='modal-input'
          placeholder='Title news'
          id='title'
          value={title}
          onChange={handleChangeTitle}
        />
      </p>
      <p>
        <textarea
          name='text'
          className='modal-input modal-text'
          id='description'
          placeholder='Description news'
          value={body}
          onChange={handleChangeDescription}
        ></textarea>
      </p>
      <div className='modal-control'>
        <button className='btn' onClick={() => onSubmit({ title, body })}>
          Change
        </button>
        <button className='btn' onClick={onClose}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default AddForm;
