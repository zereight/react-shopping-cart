import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import persistedReducer from './reducer';

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistedStore = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

export { store, persistedStore };

export type { RootState };
