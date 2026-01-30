import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Whiteboard = ({ darkMode: initialDarkMode }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState(isDarkMode ? '#ffffff' : '#1a1a1a');
  const [showShortcuts, setShowShortcuts] = useState(false);

  const theme = {
    canvasBg: isDarkMode ? '#1e293b' : '#ffffff',
    toolbarBg: isDarkMode ? '#0f172a' : '#ffffff',
    text: isDarkMode ? '#f1f5f9' : '#1a1a1a',
    border: isDarkMode ? '#334155' : '#e2e8f0',
    accent: '#3b82f6'
  };

  // --- KEYBOARD SHORTCUTS LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent shortcuts if user is typing in a text field (if you add them later)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case 'p': setTool('pen'); break;
        case 'e': setTool('eraser'); break;
        case 'c': clearCanvas(); break;
        case 'd': setIsDarkMode(!isDarkMode); break;
        case '?': setShowShortcuts(!showShortcuts); break;
        case 's': e.preventDefault(); exportPDF(); break;
        default: break;
      }

      // Undo logic (Ctrl/Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        console.log("Undo triggered via keyboard");
        // Trigger your undo function here
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDarkMode, showShortcuts]);

  useEffect(() => {
    initCanvas();
  }, [isDarkMode]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    contextRef.current = ctx;
    ctx.fillStyle = theme.canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const clearCanvas = () => {
    contextRef.current.fillStyle = theme.canvasBg;
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const exportPDF = () => {
    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL("image/jpeg");
    link.download = `ByteDesk-Export.jpg`;
    link.click();
  };

  const startInteraction = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.strokeStyle = tool === 'eraser' ? theme.canvasBg : color;
    contextRef.current.lineWidth = tool === 'eraser' ? 30 : 3;
    setIsDrawing(true);
  };

  const handleMove = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.canvasBg }}>
      <canvas 
        ref={canvasRef} 
        onMouseDown={startInteraction} 
        onMouseMove={handleMove} 
        onMouseUp={() => setIsDrawing(false)}
        style={styles.canvas} 
      />

      {/* --- SHORTCUTS LEGEND --- */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            style={{ ...styles.legend, backgroundColor: theme.toolbarBg, color: theme.text, borderColor: theme.border }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>Keyboard Shortcuts</h4>
            <div style={styles.shortcutRow}><span>Pen</span> <kbd style={styles.kbd}>P</kbd></div>
            <div style={styles.shortcutRow}><span>Eraser</span> <kbd style={styles.kbd}>E</kbd></div>
            <div style={styles.shortcutRow}><span>Dark Mode</span> <kbd style={styles.kbd}>D</kbd></div>
            <div style={styles.shortcutRow}><span>Export</span> <kbd style={styles.kbd}>S</kbd></div>
            <div style={styles.shortcutRow}><span>Clear All</span> <kbd style={styles.kbd}>C</kbd></div>
            <p style={{ fontSize: '10px', marginTop: '10px', opacity: 0.6 }}>Press ? to close</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOOLBAR --- */}
      <motion.div drag dragMomentum={false} style={{ ...styles.toolbar, backgroundColor: theme.toolbarBg, borderColor: theme.border }}>
        <button onClick={() => setTool('pen')} style={{ ...styles.iconBtn, color: tool === 'pen' ? theme.accent : theme.text }}>✏️</button>
        <button onClick={() => setTool('eraser')} style={{ ...styles.iconBtn, color: tool === 'eraser' ? theme.accent : theme.text }}>🧽</button>
        <div style={styles.divider} />
        <button onClick={() => setShowShortcuts(!showShortcuts)} style={{ ...styles.iconBtn, color: theme.text }}>⌨️</button>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...styles.iconBtn, color: theme.text }}>{isDarkMode ? '☀️' : '🌙'}</button>
      </motion.div>
    </div>
  );
};

const styles = {
  container: { width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' },
  canvas: { position: 'absolute', top: 0, left: 0, cursor: 'crosshair' },
  toolbar: { position: 'absolute', bottom: '30px', left: '20px', padding: '12px', borderRadius: '20px', border: '1px solid', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 100, cursor: 'grab' },
  iconBtn: { border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer', fontSize: '20px', background: 'none' },
  divider: { height: '1px', width: '100%', backgroundColor: '#e2e8f0' },
  
  legend: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '24px', borderRadius: '16px', border: '1px solid', zIndex: 200, boxShadow: '0 20px 50px rgba(0,0,0,0.3)', width: '220px' },
  shortcutRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' },
  kbd: { backgroundColor: 'rgba(150,150,150,0.2)', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace' }
};

export default Whiteboard;