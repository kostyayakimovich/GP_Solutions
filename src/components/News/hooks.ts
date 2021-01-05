import { useEffect, useState } from 'react';
import { CurrentNews } from '../../types';

export const useFilter = (searchString: string, news: CurrentNews[]) => {
  const [filteredNews, setFilteredNews] = useState([]);
  useEffect(() => {
    const replaceWord = new RegExp(searchString, 'gi');
    const findNewsForSearch = news.reduce((acc: any, item) => {
      if (
        searchString &&
        (item.title.includes(searchString) || item.body.includes(searchString))
      ) {
        const titleNews = item.title.replace(
          replaceWord,
          `<b>${searchString}</b>`
        );
        const bodyNews = item.body.replace(
          replaceWord,
          `<b>${searchString}</b>`
        );
        acc = [...acc, { title: titleNews, body: bodyNews, id: item.id }];
      }
      return acc;
    }, []);
    setFilteredNews(findNewsForSearch);
  }, [news, searchString, setFilteredNews]);

  return { filteredNews };
};
