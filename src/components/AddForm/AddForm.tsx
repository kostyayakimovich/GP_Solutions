import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Payload } from '../../types';
import Button from '../Button';

type Props = {
  onSubmit: (payload: Payload) => void;
  onClose: () => void;
  titleValue: string;
  bodyValue: string;
  buttonName: string;
  authorValue: string;
};
type State = {
  currentUser: string;
};

const AddForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  titleValue,
  bodyValue,
  buttonName,
  authorValue,
}) => {
  const [title, setTitle] = useState(titleValue);
  const [body, setDescription] = useState(bodyValue);
  const [author, setAuthor] = useState(authorValue);
  const loginUser = useSelector((state: State) => state.currentUser);
  const handleChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  useEffect(() => {
    setAuthor(loginUser);
  }, [loginUser]);

  const handleChangeDescription = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value);
    },
    []
  );

  const onClick = useCallback(() => {
    onSubmit({ title, body, author });
  }, [body, onSubmit, title, author]);

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
        <Button buttonName={buttonName} typeBtn='button' onClick={onClick} />
        <Button buttonName='Exit' typeBtn='button' onClick={onClose} />
      </div>
    </div>
  );
};

export default AddForm;
