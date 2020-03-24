import { bindActionCreators } from 'redux';
import ueid from 'utils/ueid';
import store from '../store';
import { Dictionary, DictionariesAction } from '../reducers/dictionaries';

type ID = string;

const setDictionariesCreator = (payload: Dictionary[]): DictionariesAction => ({
  type: 'SET_DICTIONARIES',
  payload,
});

const addDictionaryCreator = (payload: Dictionary): DictionariesAction => ({
  type: 'ADD_DICTIONARY',
  payload: { ...payload, id: ueid() },
});

const patchDictionaryCreator = (payload: Dictionary): DictionariesAction => ({
  type: 'PATCH_DICTIONARY',
  payload,
});

const deleteDictionaryCreator = (payload: ID): DictionariesAction => ({
  type: 'DELETE_DICTIONARY',
  payload,
});

const wipeDictionariesCreator = (): DictionariesAction => ({ type: 'WIPE_DICTIONARIES' });

const boundActions = bindActionCreators(
  {
    setDictionaries: setDictionariesCreator,
    addDictionary: addDictionaryCreator,
    patchDictionary: patchDictionaryCreator,
    deleteDictionary: deleteDictionaryCreator,
    wipeDictionaries: wipeDictionariesCreator,
  },
  store.dispatch,
);

export const {
  setDictionaries,
  addDictionary,
  patchDictionary,
  deleteDictionary,
  wipeDictionaries,
} = boundActions;
