'use client'
import React, { Suspense } from "react";
import { store, persistor } from "@/store/store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { Provider } from "react-redux";
import Loading from "@/app/loading";
interface IPersistStore {
  children: React.ReactNode;
}

const PersistStore: React.FC<IPersistStore> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      
        {children}
     
      </PersistGate>
    </Provider>
  );
};

export default PersistStore;
