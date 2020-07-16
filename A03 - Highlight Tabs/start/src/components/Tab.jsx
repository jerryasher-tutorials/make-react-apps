import React, { useState } from 'react';

export default function Tab({ children }) {
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, opacity: 0 });

  function moveHighLight(e) {
    console.log(e.nativeEvent - 150);
    // update highlightstyle
    setHighlightStyle({ left: e.nativeEvent.layerX - 150 });
  }

  function hideHighLight(e) {
    // update highlightstyle
    setHighlightStyle({ opacity: 0 });
  }

  return (
    <div className='tab' onMouseMove={moveHighLight} onMouseOut={hideHighLight}>
      <div className='highlight' style={highlightStyle} />
      {children}
    </div>
  );
}
