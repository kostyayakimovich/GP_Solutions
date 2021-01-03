import React, { useState } from 'react';
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
  setTitleNews: (title: string) => void;
};
const News: React.FC<Props> = ({
  setIsModalOpen,
  setModalType,
  setTitleNews,
  news,
}) => {
  const handleDelete = (title: string) => {
    setModalType(ModalType.Delete);
    setIsModalOpen(true);
    setTitleNews(title);
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
              <button className='btn' onClick={() => handleDelete(title)}>
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
