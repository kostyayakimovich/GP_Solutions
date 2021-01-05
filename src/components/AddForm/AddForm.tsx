import React, { useCallback, useState } from 'react';
import { Payload } from '../../types';
import Button from '../Button';
import './style.css';

type Props = {
  onSubmit: (payload: Payload) => void;
  onClose: () => void;
  titleValue: string;
  bodyValue: string;
  buttonName: string;
};

const AddForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  titleValue,
  bodyValue,
  buttonName,
}) => {
  const [title, setTitle] = useState(titleValue);
  const [body, setDescription] = useState(bodyValue);

  const handleChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );
  const handleChangeDescription = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value);
    },
    []
  );
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
        <Button
          buttonName={buttonName}
          onClick={() => onSubmit({ title, body })}
        />
        <Button buttonName='Exit' onClick={onClose} />
      </div>
    </div>
  );
};

export default AddForm;
