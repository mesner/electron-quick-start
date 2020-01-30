import React from 'react';
import './App.css';
import {FinsembleStateProvider} from './store/FinsembleStateProvider';
import MainWindow from './MainWindow'


const App = () => {
    return (
      <FinsembleStateProvider>
        <MainWindow></MainWindow>
      </FinsembleStateProvider>
    );
}

export default App;
