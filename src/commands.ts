import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      return fetch(action.path, { method: action.method })
        .then(checkStatus)
        .then((response) => response.json())
        .then((data) => data.hits.map((hit: any) => ({
          previewFormat: hit.previewURL,
          webFormat: hit.webformatURL,
          author: hit.user,
          largeFormat: hit.largeImageURL,
        })));
    },
    {
      successActionCreator: fetchCatsCommit,
      failActionCreator: fetchCatsRollback,
    },
  );

const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};
