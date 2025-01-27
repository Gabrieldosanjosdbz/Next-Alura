import dynamic from 'next/dynamic';
import { useState } from 'react';
// import YouTubeVideo from '../components/DynamicVideo';

const YouTubeVideo = dynamic(() => import('../components/DynamicVideo'));

export default function DynamicImportPage() {
  const [isVisible, setVideoStatus] = useState(false);
  return (
    <div>
      <p>
        Mostrar Vídeo
        <input
          type="checkbox"
          onChange={() => {
            setVideoStatus(!isVisible);
          }}
        />
      </p>
      {/* aqui o YoutubeVideo só é importado quando isVisible fica true, ou sejá, quando seleciona o select */}
      {isVisible && <YouTubeVideo />}      
    </div>
  )
}
