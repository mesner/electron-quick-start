import React, { useEffect } from 'react';
import './App.css';
import { StateProvider, useStateValue } from './StateProvider';

const FinsembleStateProvider = ({children}) => {

  const initialState = {
    counter: 0,
    showWindowPortal: false,
    ready: true
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
      case 'finsembleReady':
        return {
          ...state,
          ready: true
        }
      default:
        return state;
    }
  };

  
  // const [_, dispatch] = useStateValue();

  // useEffect(() => {
  //   setTimeout(()=>{
  //     console.log('dispatching finsembleReady')
  //     dispatch({type:'finsembleReady'})
  //   },3000)
  // },[])
  
console.log(`children:${children}`)
debugger;
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        {children}
      </StateProvider>
    );
}

export default FinsembleStateProvider;
