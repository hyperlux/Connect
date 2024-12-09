import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerImages = [
  {
    id: 1,
    url: '/firematri.png',
    title: 'Matrimandir',
    quote: 'Auroville wants to be the bridge between the past and the future.',
    author: 'The Mother'
  },
  {
    id: 2,
    url: '/logodark.png',
    title: 'Auroville Community',
    quote: 'There should be somewhere on earth a place which no nation could claim as its own...',
    author: 'The Mother'
  },
  {
    id: 3,
    url: '/logolight.png',
    title: 'Unity in Diversity',
    quote: 'Auroville belongs to humanity as a whole.',
    author: 'The Mother'
  }
];

export default function WelcomeBanner() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[280px] rounded-xl overflow-hidden">
      {bannerImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
              <p className="text-base mb-2 italic">"{image.quote}"</p>
              <p className="text-xs">— {image.author}</p>
            </div>
          </div>
        </div>
      ))}
      
      {bannerImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}