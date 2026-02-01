import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState('brush');
  
  const [history, setHistory] = useState([]); 
  const [redoStack, setRedoStack] = useState([]);
  const [colorTray, setColorTray] = useState(['#0f172a', '#3b82f6', '#ef4444', '#10b981', '#f59e0b']);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scale = window.devicePixelRatio || 1;
    
    const updateSize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      const context = canvas.getContext("2d");
      context.scale(scale, scale);
      context.lineCap = "round";
      context.lineJoin = "round";
      contextRef.current = context;
      
      const savedDrawing = localStorage.getItem('whiteboard_save');
      if (savedDrawing) {
        const image = new Image();
        image.src = savedDrawing;
        image.onload = () => {
          context.drawImage(image, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        };
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const savedDrawing = localStorage.getItem('whiteboard_save');
    if (savedDrawing) {
      setHistory([savedDrawing]);
    } else {
      setHistory([canvas.toDataURL()]);
    }

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? bgColor : color;
      contextRef.current.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
    }
  }, [color, lineWidth, tool, bgColor]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
    if (e.type === 'touchstart') e.preventDefault();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    if (e.type === 'touchmove') e.preventDefault();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
      saveState();
    }
  };

  const updateColor = (newColor) => {
    setColor(newColor);
    setTool('brush');
    setColorTray(prev => {
      if (prev.includes(newColor)) return prev;
      const updated = [newColor, ...prev];
      return updated.slice(0, 5);
    });
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    setHistory(prev => [...prev, dataURL]);
    setRedoStack([]); 
    localStorage.setItem('whiteboard_save', dataURL);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const previous = history[history.length - 2];
    const current = history[history.length - 1];
    setRedoStack(prev => [...prev, current]);
    applyState(previous, () => setHistory(prev => prev.slice(0, -1)));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    applyState(nextState, () => {
      setHistory(prev => [...prev, nextState]);
      setRedoStack(prev => prev.slice(0, -1));
    });
  };

  const applyState = (dataURL, callback) => {
    const image = new Image();
    image.src = dataURL;
    image.onload = () => {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      contextRef.current.drawImage(image, 0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
      callback();
    };
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = bgColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
    const link = document.createElement('a');
    link.download = `ByteDesk-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveState();
  };

  const ToolButton = ({ icon, isActive, onClick, colorScheme = "#3b82f6" }) => (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      style={{
        ...styles.toolBtn,
        backgroundColor: isActive ? colorScheme : '#fff',
        color: isActive ? '#fff' : '#64748b',
        border: isActive ? `1px solid ${colorScheme}` : '1px solid #e2e8f0',
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
    </motion.button>
  );

  return (
    <div style={styles.container}>
      <div className="whiteboard-toolbar" style={styles.toolbar}>
        {/* Color Group */}
        <div style={styles.toolGroup}>
          <div style={styles.colorInputWrapper}>
            <input type="color" value={color} onChange={(e) => updateColor(e.target.value)} style={styles.hiddenColorInput} />
            <div style={{...styles.colorPreview, backgroundColor: color}} />
          </div>
          
          {/* COLOR TRAY RESTORED FOR DESKTOP - CLEARS WARNING */}
          <div className="hide-mobile" style={styles.colorTray}>
            {colorTray.map((c, i) => (
              <div 
                key={i} 
                onClick={() => setColor(c)} 
                style={{
                  ...styles.trayCircle, 
                  backgroundColor: c, 
                  border: color === c ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                  transform: color === c ? 'scale(1.1)' : 'scale(1)'
                }} 
              />
            ))}
          </div>

          <div style={styles.divider} />
          <div style={styles.colorInputWrapper}>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={styles.hiddenColorInput} />
            <div style={{...styles.colorPreview, backgroundColor: bgColor, borderRadius: '4px'}} title="Page Color" />
          </div>
        </div>

        {/* Tools Group */}
        <div style={styles.toolGroup}>
          <ToolButton icon="🖌️" isActive={tool === 'brush'} onClick={() => setTool('brush')} />
          <ToolButton icon="🧼" isActive={tool === 'eraser'} onClick={() => setTool('eraser')} colorScheme="#64748b" />
          <div style={styles.divider} />
          <div style={styles.thicknessWrapper}>
            {[4, 12, 24].map(size => (
              <div 
                key={size} 
                onClick={() => setLineWidth(size)}
                style={{
                  ...styles.thicknessDot, 
                  width: size/4 + 6, 
                  height: size/4 + 6, 
                  backgroundColor: lineWidth === size ? '#3b82f6' : '#cbd5e1'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Actions Group */}
        <div style={styles.toolGroup}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <ToolButton icon="↩️" onClick={undo} />
            <ToolButton icon="↪️" onClick={redo} />
          </div>
          <div style={styles.divider} />
          <ToolButton icon="💾" onClick={downloadCanvas} />
          <ToolButton icon="🗑️" onClick={clearCanvas} />
        </div>
      </div>

      <div style={{...styles.canvasWrapper, backgroundColor: bgColor}}>
        <canvas 
          ref={canvasRef}
          onMouseDown={startDrawing} 
          onMouseMove={draw} 
          onMouseUp={stopDrawing} 
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{...styles.canvas, cursor: tool === 'eraser' ? 'cell' : 'crosshair'}} 
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .whiteboard-toolbar { padding: 6px 10px !important; gap: 4px !important; justify-content: space-between !important; border-radius: 12px !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100%', width: '100%', gap: '10px' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ffffff', borderRadius: '15px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  toolGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  toolBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '10px', cursor: 'pointer', minWidth: '40px', border: 'none' },
  divider: { width: '1px', height: '24px', backgroundColor: '#e2e8f0' },
  colorInputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  hiddenColorInput: { position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' },
  colorPreview: { width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #e2e8f0' },
  colorTray: { display: 'flex', gap: '8px', padding: '0 5px' },
  trayCircle: { width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s' },
  thicknessWrapper: { display: 'flex', alignItems: 'center', gap: '6px' },
  thicknessDot: { borderRadius: '50%', cursor: 'pointer' },
  canvasWrapper: { flex: 1, borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden' },
  canvas: { width: '100%', height: '100%', touchAction: 'none' }
};

export default Whiteboard;