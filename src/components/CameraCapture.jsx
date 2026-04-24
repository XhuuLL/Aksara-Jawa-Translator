'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, Check, RefreshCcw } from 'lucide-react';

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState('');

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Prefer back camera
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setError('');
      setCapturedImage(null);
    } catch (err) {
      console.error('Camera error:', err);
      setError('Gagal mengakses kamera. Pastikan Anda telah memberikan izin.');
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to image
    canvas.toBlob((blob) => {
      const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const previewUrl = URL.createObjectURL(blob);
      setCapturedImage({ file, previewUrl });
    }, 'image/jpeg', 0.9);
  }, []);

  const handleRetake = () => {
    if (capturedImage?.previewUrl) {
      URL.revokeObjectURL(capturedImage.previewUrl);
    }
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage.file);
      onClose();
    }
  };

  const handleClose = () => {
    if (capturedImage?.previewUrl) {
      URL.revokeObjectURL(capturedImage.previewUrl);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4 sm:p-6">
      <div className="w-full max-w-lg bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h3 className="text-zinc-100 font-semibold flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-500" />
            Ambil Foto Teks
          </h3>
          <button onClick={handleClose} className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative bg-black flex-1 min-h-[400px] flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="text-center p-6">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={startCamera} className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition">
                Coba Lagi
              </button>
            </div>
          ) : capturedImage ? (
            <img src={capturedImage.previewUrl} alt="Captured" className="w-full h-full object-contain" />
          ) : (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
          )}
          
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Overlay guidelines (optional) */}
          {!capturedImage && !error && (
            <div className="absolute inset-8 border-2 border-white/20 border-dashed rounded-xl pointer-events-none flex items-center justify-center">
              <span className="text-white/40 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                Posisikan teks di dalam kotak
              </span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex justify-center items-center gap-6">
          {capturedImage ? (
            <>
              <button onClick={handleRetake} className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                  <RefreshCcw className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Ulangi</span>
              </button>
              <button onClick={handleConfirm} className="flex flex-col items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs font-medium text-amber-500">Gunakan Foto</span>
              </button>
            </>
          ) : (
            <button 
              onClick={takePhoto} 
              disabled={!!error}
              className="group flex flex-col items-center gap-2 disabled:opacity-50"
            >
              <div className="w-16 h-16 rounded-full border-4 border-zinc-300 flex items-center justify-center p-1 group-active:scale-95 transition-transform">
                <div className="w-full h-full rounded-full bg-white group-hover:bg-amber-100 transition-colors" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
