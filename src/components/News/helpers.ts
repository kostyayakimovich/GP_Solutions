import { CurrentNews } from '../../types';

const wordFilter = (searchString: string, news: CurrentNews[]) => {
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
      const bodyNews = item.body.replace(replaceWord, `<b>${searchString}</b>`);
      acc = [
        ...acc,
        {
          title: titleNews,
          body: bodyNews,
          id: item.id,
          author: item.author,
          dateCreate: item.dateCreate,
        },
      ];
    }
    return acc;
  }, []);
  return findNewsForSearch;
};
const sortDate = (valueSortDate: string, news: CurrentNews[]) => {
  const sortedNews = [...news];
  if (valueSortDate === 'ASC') {
    sortedNews.sort(
      (left, right) =>
        new Date(left.dateCreate).valueOf() -
        new Date(right.dateCreate).valueOf()
    );
  }

  if (valueSortDate === 'DESC') {
    sortedNews.sort(
      (left, right) =>
        new Date(right.dateCreate).valueOf() -
        new Date(left.dateCreate).valueOf()
    );
  }

  return sortedNews;
};

const sortAuthor = (
  searchAuthor: string,
  news: CurrentNews[],
  valueSortDate: string
) => {
  const findNewsByAuthor = news.reduce((acc: any, item) => {
    if (searchAuthor && item.author === searchAuthor) acc = [...acc, item];
    return acc;
  }, []);

  return valueSortDate === 'ASC'
    ? findNewsByAuthor.reverse()
    : findNewsByAuthor;
};

export const getFilteredNews = (
  news: CurrentNews[],
  searchAuthor: string,
  searchString: string,
  valueSortDate: string
) => {
  const sortedBySearchString = searchString
    ? wordFilter(searchString, news)
    : news;

  const sortedByAuthor = searchAuthor
    ? sortAuthor(searchAuthor, sortedBySearchString, valueSortDate)
    : sortedBySearchString;

  const sortedByDate = valueSortDate
    ? sortDate(valueSortDate, sortedByAuthor)
    : sortedByAuthor;

  return sortedByDate;
};
