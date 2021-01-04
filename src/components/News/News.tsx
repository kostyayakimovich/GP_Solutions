import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { CurrentNews, ModalType } from '../../types';

type State = {
  news: CurrentNews[];
};

type Props = {
  openModal: (news: CurrentNews, type: ModalType) => void;
};

const News: React.FC<Props> = ({ openModal }) => {
  const news = useSelector((state: State) => state.news);

  return (
    <>
      <section className='news'>
        {news.map((value) => (
          <article className='cardNews' key={value.id}>
            <div className='textNews'>
              <h1>{value.title}</h1>
              <div>{value.body}</div>
            </div>
            <div className='controlNews'>
              <button
                className='btn'
                onClick={() => openModal(value, ModalType.Edit)}
              >
                Update
              </button>
              <button
                className='btn'
                onClick={() => openModal(value, ModalType.Delete)}
              >
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
