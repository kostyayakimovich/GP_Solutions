import React, { useState } from 'react';
import { dataNews } from './dataNews';
import './style.css';
import { ModalType } from '../../types';

type CurrentNews = {
  title: string;
  body: string;
};

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  news: CurrentNews[];
  setModalType: (type: ModalType) => void;
};
const News: React.FC<Props> = ({ setIsModalOpen, setModalType, news }) => {
  const handleDelete = () => {
    setModalType(ModalType.Delete);
    setIsModalOpen(true);
  };
  return (
    <>
      <section className='news'>
        {news.map(({ title, body }) => (
          <article className='cardNews' key={title}>
            <div className='textNews'>
              <h1>{title}</h1>
              <div>{body}</div>
            </div>
            <div className='controlNews'>
              <button className='btn'>Update</button>
              <button className='btn' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};
export default News;
