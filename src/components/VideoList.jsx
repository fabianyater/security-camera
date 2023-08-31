import React, { useEffect } from 'react';

function VideoList() {

  useEffect(() => {
    // Lógica para cargar los videos grabados
  }, []);

  return (
    <div className="video-list">
      <h2>Recorded Videos</h2>
      <ul>
        {/* Mapear y mostrar los videos aquí */}
      </ul>
    </div>
  );
}

export default VideoList;
