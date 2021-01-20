import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFilter, useSortDate } from './hooks';
import { CurrentNews, ModalType } from '../../types';
import Button from '../Button';
import './style.css';

type State = {
  news: CurrentNews[];
  searchString: string;
  isSortDate: boolean;
};

type Props = {
  openModal: (news: CurrentNews, type: ModalType) => void;
};

const News: React.FC<Props> = ({ openModal }) => {
  const news = useSelector((state: State) => state.news);
  const searchString = useSelector((state: State) => state.searchString);
  const isSortDate = useSelector((state: State) => state.isSortDate);

  const { filteredNews } = useFilter(searchString, news);
  const { sortedNews } = useSortDate(isSortDate, news);
  const [newsList, setNewsList] = useState(
    filteredNews.length ? filteredNews : news
  );

  useEffect(() => {
    if (searchString) {
      setNewsList(filteredNews);
    } else if (isSortDate) {
      setNewsList(sortedNews);
    } else {
      setNewsList(news);
    }
  }, [filteredNews, sortedNews, news, searchString, isSortDate]);

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
