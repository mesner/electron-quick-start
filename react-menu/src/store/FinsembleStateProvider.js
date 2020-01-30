import React, { useEffect } from 'react';
import { StateProvider, useStateValue } from './StateProvider';

export const FinsembleStateProvider = ({children}) => {

  const initialState = {
    counter: 0,
    showWindowPortal: false,
    ready: false
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

  const WaitForFSBL = ({children}) => {
    
    const [state, dispatch] = useStateValue();

    useEffect(() => {
      setTimeout(()=>{
        console.log('dispatching finsembleReady')
        dispatch({type:'finsembleReady'})
      },5000)
    },[dispatch])

    return (
    <div>
      {state.ready && children}
    </div>
    )
  } 

    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <WaitForFSBL>
          {children}
        </WaitForFSBL>
      </StateProvider>
    );
}
