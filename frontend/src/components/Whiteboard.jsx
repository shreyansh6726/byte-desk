import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState('brush');
  
  // Stacks for Undo/Redo
  const [history, setHistory] = useState([]); 
  const [redoStack, setRedoStack] = useState([]);
  
  // Color Tray (max 5)
  const [colorTray, setColorTray] = useState(['#0f172a', '#3b82f6', '#ef4444', '#10b981', '#f59e0b']);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scale = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * scale;
    canvas.height = canvas.offsetHeight * scale;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

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
        setHistory([savedDrawing]);
      };
    } else {
      setHistory([canvas.toDataURL()]);
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? bgColor : color;
      contextRef.current.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
    }
  }, [color, lineWidth, tool, bgColor]);

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
    setRedoStack([]); // Clear redo stack on new action
    localStorage.setItem('whiteboard_save', dataURL);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    
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
      localStorage.setItem('whiteboard_save', dataURL);
    };
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Fill background color first
    tempCtx.fillStyle = bgColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Draw drawing on top
    tempCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = `ByteDesk-Design-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveState();
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const ToolButton = ({ icon, isActive, onClick, colorScheme = "#3b82f6", label }) => (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        ...styles.toolBtn,
        backgroundColor: isActive ? colorScheme : '#fff',
        color: isActive ? '#fff' : '#64748b',
        border: isActive ? `1px solid ${colorScheme}` : '1px solid #e2e8f0',
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {label && <span style={{fontSize: '11px', fontWeight: 'bold'}}>{label}</span>}
    </motion.button>
  );

  return (
    <div style={styles.container}>
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} style={styles.toolbar}>
        {/* Color Section */}
        <div style={styles.toolGroup}>
          <div style={styles.colorInputWrapper}>
            <input type="color" value={color} onChange={(e) => updateColor(e.target.value)} style={styles.hiddenColorInput} />
            <div style={{...styles.colorPreview, backgroundColor: color}} />
          </div>
          <div style={styles.colorTray}>
            {colorTray.map((c, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.2 }}
                onClick={() => setColor(c)}
                style={{...styles.trayCircle, backgroundColor: c, border: color === c ? '2px solid #3b82f6' : '1px solid #e2e8f0'}} 
              />
            ))}
          </div>
          <div style={styles.divider} />
          {/* Page Color */}
          <div style={styles.colorInputWrapper}>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={styles.hiddenColorInput} />
            <div style={{...styles.colorPreview, backgroundColor: bgColor, borderRadius: '4px'}} />
            <span style={{fontSize: '10px', fontWeight: 'bold', marginLeft: '5px'}}>PAGE</span>
          </div>
        </div>

        {/* Brush Controls */}
        <div style={styles.toolGroup}>
          <ToolButton icon="🖌️" isActive={tool === 'brush'} onClick={() => setTool('brush')} />
          <ToolButton icon="🧼" isActive={tool === 'eraser'} onClick={() => setTool('eraser')} colorScheme="#64748b" />
          <div style={styles.thicknessWrapper}>
            {[2, 8, 15, 30].map(size => (
              <div 
                key={size} 
                onClick={() => setLineWidth(size)}
                style={{
                  ...styles.thicknessDot, 
                  width: size/1.5 + 4, 
                  height: size/1.5 + 4, 
                  backgroundColor: lineWidth === size ? '#3b82f6' : '#cbd5e1'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={styles.toolGroup}>
          <ToolButton icon="↩️" onClick={undo} label="Undo" />
          <ToolButton icon="↪️" onClick={redo} label="Redo" />
          <div style={styles.divider} />
          <ToolButton icon="💾" onClick={downloadCanvas} colorScheme="#10b981" isActive={false} />
          <ToolButton icon="🗑️" onClick={clearCanvas} colorScheme="#ef4444" isActive={false} />
        </div>
      </motion.div>

      <div style={{...styles.canvasWrapper, backgroundColor: bgColor}}>
        <canvas 
          onMouseDown={startDrawing} 
          onMouseUp={() => { setIsDrawing(false); contextRef.current.closePath(); saveState(); }} 
          onMouseMove={draw} 
          onMouseLeave={() => setIsDrawing(false)}
          ref={canvasRef} 
          style={{...styles.canvas, cursor: tool === 'eraser' ? 'cell' : 'crosshair'}} 
        />
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100%', width: '100%', gap: '15px' },
  toolbar: { 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 25px', 
    backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' 
  },
  toolGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
  toolBtn: { 
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px 12px', 
    borderRadius: '12px', cursor: 'pointer', border: '1px solid #e2e8f0', minWidth: '50px'
  },
  divider: { width: '1px', height: '30px', backgroundColor: '#e2e8f0', margin: '0 5px' },
  colorInputWrapper: { position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' },
  hiddenColorInput: { position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' },
  colorPreview: { width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #e2e8f0' },
  colorTray: { display: 'flex', gap: '6px', backgroundColor: '#f8fafc', padding: '5px 10px', borderRadius: '20px', border: '1px solid #e2e8f0' },
  trayCircle: { width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer' },
  thicknessWrapper: { display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px' },
  thicknessDot: { borderRadius: '50%', cursor: 'pointer', transition: '0.2s' },
  canvasWrapper: { flex: 1, borderRadius: '30px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: 'inner 0 4px 10px rgba(0,0,0,0.05)', transition: 'background-color 0.3s ease' },
  canvas: { width: '100%', height: '100%', touchAction: 'none' }
};

export default Whiteboard;