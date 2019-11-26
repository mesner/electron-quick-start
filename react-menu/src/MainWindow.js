import React from 'react';
import MyWindowPortal from './MyWindowPortal'
import './App.css';
import { useStateValue } from './StateProvider';

const {useEffect} = React;

const MainWindow = () => {
  const [{ counter, showWindowPortal }, dispatch] = useStateValue();

  const getWindowLocs = (rows,cols) => {
    const height = Math.floor(window.screen.availHeight / rows);
    const width = Math.floor(window.screen.availWidth / cols);
    
    let windowLocs = [];
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < cols; j++){
        windowLocs.push({
          top: window.screen.availTop + i * height,
          left: window.screen.availLeft + j * width,
          width: width,
          height: height
        });
      }
    }
    return windowLocs;
  } 
  
  useEffect(() => {
    // useEffect hook is for componentDidMount
    window.setInterval(() => {
      dispatch({type: 'incrementCounter'});
    }, 1000);
  }, [dispatch]);
    
  const toggleWindowPortal = () => {
    dispatch({type: 'toggleWindowPortal'});
  }
  
  return (
    <div>
      <h1>Counter: {counter}</h1>
      
      <button onClick={toggleWindowPortal}>
        {showWindowPortal ? 'Close the' : 'Open a'} Portal
      </button>
      
      {showWindowPortal && (
        getWindowLocs(6,8).map(bounds => {
        return(
          <MyWindowPortal width={bounds.width} height={bounds.height} top={bounds.top} left={bounds.left} url={"https://www.theworldsworstwebsiteever.com/"}>
            <h1>Counter in a portal: {counter}</h1>
            <p>Even though I render in a different window, I share state!</p>
            
            <button onClick={toggleWindowPortal} >
              Close me!
            </button>
          </MyWindowPortal>
        )
        })
      )}
    </div>
  );
  
}

export default MainWindow;