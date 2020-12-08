import React, { useState } from 'react';
import './App.scss';
import IndexPage from './components/pages/IndexPage/IndexPage';
import AviaSales from './helpers/AviaSales';
import { ApiProvider } from './contexts/apiContext';

function App() {
  const [ticketsApi] = useState(new AviaSales());
  return (
    <div className="App">
      <ApiProvider value={ticketsApi}>
        <IndexPage />
      </ApiProvider>
    </div>
  );
}

export default App;
