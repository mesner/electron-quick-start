import React, { useRef, useLayoutEffect, useState } from "react";

const BrowserView = (params) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
    const rect = {
      x: targetRef.current.offsetLeft,
      y: targetRef.current.offsetTop,
      width: targetRef.current.offsetWidth,
      height: targetRef.current.offsetHeight
    }
    window.FSBL.addBrowserView("https://google.com", rect);
    rect.x = rect.x + 50;
    window.FSBL.addBrowserView("https://google.com", rect);
  }, []);
  return (
    <div style={{width:'100%', height:'100%'}} ref={targetRef}>
      <p>{dimensions.width}</p>
      <p>{dimensions.height}</p>
    </div>
  );
}

export default BrowserView;
