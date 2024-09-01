
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import autoConfigSlice from '@/slices/autoConfigSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
  whitelist: ["autoConfig"]
};

const reducers = combineReducers({
  "autoConfig" : autoConfigSlice
});
console.log(reducers)
const _persistedReducer = persistReducer(persistConfig, (reducers as any));

const defualtMiddlewareConfig = {
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ],
    },
  }

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware(defualtMiddlewareConfig)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store