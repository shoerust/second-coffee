'use client';

import React from 'react'
import useCanvas from './useCanvas'

const Canvas = props => {  
  
  const canvasRef = useCanvas()
  return <canvas ref={canvasRef}/>
}

export default Canvas