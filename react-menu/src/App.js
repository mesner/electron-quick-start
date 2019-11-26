import React from 'react';
import './App.css';
import { StateProvider } from './StateProvider';
import MainWindow from './MainWindow'


const App = () => {

  const initialState = {
    counter: 0,
    showWindowPortal: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'incrementCounter':
        return {
          ...state,
          counter: state.counter + 1
        };
      case 'toggleWindowPortal':
          return {
            ...state,
            showWindowPortal: !state.showWindowPortal
          }
      default:
        return state;
    }
  };
  
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <MainWindow></MainWindow>
      </StateProvider>
    );
}

export default App;
