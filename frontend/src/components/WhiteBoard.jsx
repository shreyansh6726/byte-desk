import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Whiteboard = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Brush settings
  const [color, setColor] = useState(darkMode ? '#ffffff' : '#1a1a1a');

  const theme = {
    canvasBg: darkMode ? '#1e293b' : '#ffffff',
    toolbarBg: darkMode ? '#0f172a' : '#ffffff',
    text: darkMode ? '#f1f5f9' : '#1a1a1a',
    border: darkMode ? '#334155' : '#e2e8f0',
    accent: '#3b82f6'
  };

  // Synchronize color with theme changes
  useEffect(() => {
    setColor(darkMode ? '#ffffff' : '#1a1a1a');
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set resolution for high-DPI displays
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;

    // Fill background
    context.fillStyle = theme.canvasBg;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = 3;
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <canvas
        onMouseDown={startInteraction ? undefined : startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        ref={canvasRef}
        style={{ cursor: 'crosshair', display: 'block' }}
      />

      <motion.div 
        drag 
        dragMomentum={false} 
        style={{ 
          position: 'absolute', bottom: '30px', left: '20px', padding: '12px',
          borderRadius: '20px', border: `1px solid ${theme.border}`,
          backgroundColor: theme.toolbarBg, display: 'flex', flexDirection: 'column',
          gap: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 100
        }}
      >
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          style={{ border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', background: 'none' }} 
        />
        <button 
          onClick={() => {
            contextRef.current.fillStyle = theme.canvasBg;
            contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }}
          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}
        >
          🗑️
        </button>
      </motion.div>
    </div>
  );
};

// CRITICAL: Ensure this exactly matches the import name in Home.jsx
export default Whiteboard;