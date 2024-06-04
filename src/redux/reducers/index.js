import { combineReducers } from 'redux';
import commomReducer from './commomReducer';
import DataReducer from './commomReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['colorrdata', 'detailsStore', 'TicketData'],
};
const persistConfigdata = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tabid'],
};


const rootReducers = combineReducers({
  DataReducer : persistReducer(persistConfigdata,DataReducer),
  commomReducer: persistReducer(persistConfig, commomReducer),
});

export default rootReducers;