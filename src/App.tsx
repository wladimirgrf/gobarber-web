import React from 'react';

// import SignIn from './pages/SignIn';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';

import AppProvider from './hooks';

const App: React.FunctionComponent = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <ToastContainer />

    <GlobalStyle />
  </>
);

export default App;
