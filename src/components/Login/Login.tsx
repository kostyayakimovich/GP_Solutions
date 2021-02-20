import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE, SIGNIN } from '../../reducers/types';
import { LoginModalType, Person } from '../../types';
import Button from '../Button';
import { checkUserCreate, checkUserSignin } from './helpers';
import './style.css';

type Props = {
  closeLoginModal: () => void;
  type: LoginModalType;
};
type State = {
  users: [];
  currentUser: string;
};

const Login: React.FC<Props> = ({ closeLoginModal, type }) => {
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state: State) => state.users);
  useEffect(() => {
    setUserList(users);
  }, [users]);
  const { register, handleSubmit, errors } = useForm<Person>();

  const onSubmit = useCallback(
    (data: Person) => {
      if (type === 'create') {
        const checkExistUser = checkUserCreate(
          userList,
          data.login,
          data.email
        );
        !checkExistUser
          ? dispatch({
              type: CREATE,
              payload: { ...data },
            }) && setMessage(`Hello ${data.login}`)
          : setMessage('User with the same login or email already exists');
        if (!checkExistUser) {
          localStorage.setItem('login', data.login);
          localStorage.setItem('email', data.email);
          localStorage.setItem('password', data.password);
        }
      }
      if (type === 'signin') {
        const checkExistUser = checkUserSignin(
          userList,
          data.login,
          data.password
        );

        if (
          localStorage.getItem('login') === data.login &&
          localStorage.getItem('password') === data.password
        ) {
          dispatch({
            type: SIGNIN,
            payload: { ...data },
          });
          setMessage(`Hi again ${data.login}`);
        } else {
          localStorage.clear();
          checkExistUser
            ? dispatch({
                type: SIGNIN,
                payload: { ...data },
              }) && setMessage(`Hi again ${data.login}`)
            : setMessage('User is not found');

          if (checkExistUser) {
            localStorage.clear();
            localStorage.setItem('login', data.login);
            localStorage.setItem('email', data.email);
            localStorage.setItem('password', data.password);
          }
        }
      }
    },
    [type, dispatch, userList]
  );
  const loginUser = useSelector((state: State) => state.currentUser);
  useEffect(() => {
    if (
      message === `Hello ${loginUser}` ||
      message === `Hi again ${loginUser}`
    ) {
      setTimeout(closeLoginModal, 2000);
      setMessageColor('rgb(18, 128, 82)');
    }
  }, [closeLoginModal, message, loginUser]);

  return (
    <>
      {type === LoginModalType.Create && (
        <form className='modal form' onSubmit={handleSubmit(onSubmit)}>
          <div className='modal-card register-card'>
            <div className='modal-action'>
              <div className='register-card-input'>
                <label htmlFor='login'>Login: only letters and numbers</label>
                <input
                  name='login'
                  type='text'
                  className='modal-input'
                  placeholder='Login...'
                  id='login'
                  pattern='[A-Za-z0-9]{1,32}'
                  minLength={2}
                  maxLength={30}
                  ref={register({ required: true })}
                />
                {errors.login && errors.login.type === 'required' && (
                  <div className='error'>You must enter your login.</div>
                )}
              </div>
              <div className='register-card-input'>
                <label htmlFor='email'>Email</label>
                <input
                  name='email'
                  type='email'
                  className='modal-input'
                  placeholder='Email...'
                  id='email'
                  ref={register({ required: true })}
                  pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
                />
                {errors.email && errors.email.type === 'required' && (
                  <div className='error'>You must enter your email.</div>
                )}
              </div>
              <div className='register-card-input'>
                <label htmlFor='password'>
                  Passord: must contain letters and numbers
                </label>
                <input
                  name='password'
                  type='password'
                  className='modal-input'
                  placeholder='Password...'
                  id='password'
                  pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$'
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && (
                  <div className='error'>
                    Passord: must contain at least 4 letters and numbers.
                  </div>
                )}
              </div>

              <div className='modal-control'>
                <Button buttonName='Submit' typeBtn='submit' />
                <Button
                  buttonName='Exit'
                  typeBtn='button'
                  onClick={closeLoginModal}
                />
              </div>
              <div className='register-message'>
                <h3 style={{ color: messageColor }}>{message}</h3>
              </div>
            </div>
          </div>
        </form>
      )}
      {type === LoginModalType.Signin && (
        <form className='modal form' onSubmit={handleSubmit(onSubmit)}>
          <div className='modal-card register-card'>
            <div className='modal-action'>
              <div className='register-card-input'>
                <input
                  name='login'
                  type='text'
                  className='modal-input'
                  placeholder='Login...'
                  id='login'
                  pattern='[A-Za-z0-9]{1,32}'
                  minLength={2}
                  maxLength={30}
                  ref={register({ required: true })}
                />
                {errors.login && errors.login.type === 'required' && (
                  <div className='error'>You must enter your login.</div>
                )}
              </div>

              <div className='register-card-input'>
                <input
                  name='password'
                  type='password'
                  className='modal-input'
                  placeholder='Password...'
                  id='password'
                  pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$'
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && (
                  <div className='error'>
                    Passord: must contain at least 4 letters and numbers.
                  </div>
                )}
              </div>

              <div className='modal-control'>
                <Button buttonName='Submit' typeBtn='submit' />
                <Button
                  buttonName='Exit'
                  typeBtn='button'
                  onClick={closeLoginModal}
                />
              </div>
              <div className='register-message'>
                <h3 style={{ color: messageColor }}>{message}</h3>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
