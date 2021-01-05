import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFilter } from './hooks';
import { CurrentNews, ModalType } from '../../types';
import Button from '../Button';
import './style.css';

type State = {
  news: CurrentNews[];
  searchString: string;
};

type Props = {
  openModal: (news: CurrentNews, type: ModalType) => void;
};

const News: React.FC<Props> = ({ openModal }) => {
  const news = useSelector((state: State) => state.news);
  const searchString = useSelector((state: State) => state.searchString);

  const { filteredNews } = useFilter(searchString, news);

  const [newsList, setNewsList] = useState(
    filteredNews.length ? filteredNews : news
  );

  useEffect(() => {
    setNewsList(searchString ? filteredNews : news);
  }, [filteredNews, news, searchString]);

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
