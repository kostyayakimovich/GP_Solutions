import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFilteredNews } from './helpers';
import { CurrentNews, ModalType } from '../../types';
import Button from '../Button';
import './style.css';

type State = {
  news: CurrentNews[];
  searchString: string;
  searchAuthor: string;
  valueSortDate: string;
};

type Props = {
  openModal: (news: CurrentNews, type: ModalType) => void;
};

const News: React.FC<Props> = ({ openModal }) => {
  const news = useSelector((state: State) => state.news);
  const searchString = useSelector((state: State) => state.searchString);
  const valueSortDate = useSelector((state: State) => state.valueSortDate);
  const searchAuthor = useSelector((state: State) => state.searchAuthor);
  const [newsList, setNewsList] = useState(news);

  useEffect(() => {
    setNewsList(
      getFilteredNews(news, searchAuthor, searchString, valueSortDate)
    );
  }, [news, valueSortDate, searchString, searchAuthor]);

  return (
    <>
      <section className='news'>
        {newsList.length ? (
          newsList.map((value) => {
            const originalNews =
              news.find((item) => value.id === item.id) || value;
            return (
              <article className='cardNews' key={value.id}>
                <div className='textNews'>
                  <p
                    className='title-news'
                    dangerouslySetInnerHTML={{ __html: value.title }}
                  ></p>
                  <div dangerouslySetInnerHTML={{ __html: value.body }}></div>
                  <div className='info-news'>
                    <p className='author-news'>{value.author}</p>
                    <p className='date-news'>{value.dateCreate}</p>
                  </div>
                </div>
                <div className='controlNews'>
                  <Button
                    buttonName='Edit'
                    onClick={() => openModal(originalNews, ModalType.Edit)}
                  />
                  <Button
                    buttonName='Delete'
                    onClick={() => openModal(value, ModalType.Delete)}
                  />
                </div>
              </article>
            );
          })
        ) : (
          <h1>No results!</h1>
        )}
      </section>
    </>
  );
};
export default News;
