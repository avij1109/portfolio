'use client';

import { useEffect, useRef } from 'react';

interface SplineSceneProps {
  scene: string;
  style?: React.CSSProperties;
}

export default function SplineScene({ scene, style }: SplineSceneProps) {
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splineRef.current) return;

    // Create script element to load Spline runtime
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js';
    
    script.onload = () => {
      if (splineRef.current) {
        // Create spline-viewer element
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', scene);
        viewer.style.width = '100%';
        viewer.style.height = '100%';
        
        // Clear any existing content and add viewer
        splineRef.current.innerHTML = '';
        splineRef.current.appendChild(viewer);
      }
    };

    script.onerror = () => {
      if (splineRef.current) {
        splineRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full text-white">
            <div class="text-center">
              <div class="text-2xl mb-4">⚠️</div>
              <div>Failed to load 3D scene</div>
            </div>
          </div>
        `;
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [scene]);

  return (
    <div 
      ref={splineRef} 
      style={style}
      className="flex items-center justify-center h-full text-white"
    >
      <div className="text-center">
        <div className="text-2xl mb-4">🚀</div>
        <div>Loading 3D Scene...</div>
      </div>
    </div>
  );
} 