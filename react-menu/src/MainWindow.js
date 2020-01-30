import React from 'react';
import MyWindowPortal from './MyWindowPortal'
import './App.css';
import { useFinsembleState} from './store/FinsembleState';

const {useEffect} = React;

const MainWindow = () => {
  const [{ getCounter, getShowWindowPortal }, {incrementCounter, toggleWindowPortal}] = useFinsembleState();

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
    let interval = window.setInterval(() => {
      incrementCounter();
    }, 1000)
    return () => window.clearInterval(interval);
    ;
  }, [incrementCounter]);
    
  const shouldShowWindowPortal = getShowWindowPortal();
  const counter = getCounter();
  
  return (
    <div>
      <h1>Counter: {counter}</h1>
      
      <button onClick={toggleWindowPortal}>
        {shouldShowWindowPortal ? 'Close the' : 'Open a'} Portal
      </button>
      
      {shouldShowWindowPortal && (
        getWindowLocs(6,8).map(bounds => {
        return(
          <MyWindowPortal width={bounds.width} height={bounds.height} top={bounds.top} left={bounds.left} url={"https://www.theworldsworstwebsiteever.com/"}>
            <p>Counter in a portal: {counter}</p>
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