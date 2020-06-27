import React, { createContext, useContext, useCallback } from 'react';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FunctionComponent = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addT');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeT');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
