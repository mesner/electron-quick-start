import React from 'react';
import './App.css';
import FinsembleStateProvider from './FinsembleStateProvider';
import MainWindow from './MainWindow'


const App = () => {
  console.log('app')
    return (
      <FinsembleStateProvider>
        <MainWindow></MainWindow>
      </FinsembleStateProvider>
    );
}

export default App;
