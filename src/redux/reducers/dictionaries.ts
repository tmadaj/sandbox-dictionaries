export interface Dictionary {
  id: string;
  name: string;
  entries: Record<string, [string, string]>;
}

interface DictionariesState {
  dictionaries: Dictionary[];
}

export interface DictionariesAction {
  type: string;
  payload: Dictionary | Dictionary[] | string | Error;
  error: boolean;
}

const defaultDictionariesState: DictionariesState = {
  dictionaries: [],
};

export function dictionariesReducer(
  state: DictionariesState = defaultDictionariesState,
  action: DictionariesAction,
): DictionariesState {
  switch (action.type) {
    case 'SET_DICTIONARIES':
      return { ...state, dictionaries: action.payload };

    case 'ADD_DICTIONARY':
      return { ...state, dictionaries: [...state.dictionaries, action.payload] };

    case 'PATCH_DICTIONARY':
      return {
        ...state,
        dictionaries: state.dictionaries.map(dict =>
          dict.id === action.payload.id ? action.payload : dict,
        ),
      };

    case 'DELETE_DICTIONARY':
      return {
        ...state,
        dictionaries: state.dictionaries.filter(({ id }) => id !== action.payload),
      };

    case 'WIPE_DICTIONARIES':
      return defaultDictionariesState;

    default:
      return state;
  }
}
