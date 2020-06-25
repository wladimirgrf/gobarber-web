import React from 'react';

// import SignIn from './pages/SignIn';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FunctionComponent = () => (
  <>
    <AuthContext.Provider value={{ name: 'Wla' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
