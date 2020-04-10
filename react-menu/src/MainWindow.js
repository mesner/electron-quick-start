import React from 'react';
import MyWindowPortal from './MyWindowPortal'
import './App.css';
import { useFinsembleState} from './store/FinsembleState';
import BrowserView from './BrowserView';

const {useEffect} = React;

const MainWindow = () => {
  const [{ getCounter, getShowWindowPortal }, {incrementCounter, toggleWindowPortal}] = useFinsembleState();

  const getWindowLocs = (rows,cols) => {
    const height = 600//Math.floor(window.screen.availHeight / rows);
    const width = 400//Math.floor(window.screen.availWidth / cols);
    
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
  
  const onChildBlur = () => {
    console.log('child window blur')
    toggleWindowPortal()
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
      
      <button onClick={()=> {console.log('button click');toggleWindowPortal()}} >
        {shouldShowWindowPortal ? 'Close the' : 'Open a'} Portal
      </button>
      
      <div class="wrapper">
        <div class="box a"><BrowserView /></div>
        <div class="box b"><BrowserView /></div>
        <div class="box c"><BrowserView /></div>
        <div class="box d"><BrowserView /></div>
        <div class="box e"><BrowserView /></div>
        <div class="box f"><BrowserView /></div>
      </div>
      
      {shouldShowWindowPortal && (
        getWindowLocs(1,1).map(bounds => {
        return(
          <MyWindowPortal width={bounds.width} height={bounds.height} top={bounds.top} left={bounds.left} url={"https://www.theworldsworstwebsiteever.com/"}>
          {/* <MyWindowPortal width={bounds.width} height={bounds.height} top={bounds.top} onBlur={onChildBlur} left={bounds.left} url={"https://www.theworldsworstwebsiteever.com/"}> */}
            <p>Counter in a portal: {counter}</p>
            <button onClick={()=> {console.log('');toggleWindowPortal()}} >
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