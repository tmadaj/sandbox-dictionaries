import ueid from 'utils/ueid';
import store from '../store';
import { Dictionary } from '../reducers/dictionaries';

export const getDictionaries = (): Dictionary[] =>
  store.getState().dictionariesReducer.dictionaries;

const fallbackDictionary = { id: ueid(), name: 'Not Found', entries: [] };

export const getDictionary = (_id): Dictionary =>
  getDictionaries().find(({ id }) => id === _id) || fallbackDictionary;
