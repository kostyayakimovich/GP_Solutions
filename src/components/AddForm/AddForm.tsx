import React, { useCallback, useState } from 'react';
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

  const handleChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  const handleChangeAuthor = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuthor(event.target.value);
    },
    []
  );

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
          name='author'
          type='text'
          className='modal-input'
          placeholder='Author news'
          id='author'
          value={author}
          onChange={handleChangeAuthor}
        />
      </p>
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
        <Button buttonName={buttonName} onClick={onClick} />
        <Button buttonName='Exit' onClick={onClose} />
      </div>
    </div>
  );
};

export default AddForm;
