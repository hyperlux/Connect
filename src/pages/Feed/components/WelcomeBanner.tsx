import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const quotes = [
  {
    text: "Auroville wants to be the bridge between the past and the future.",
    author: "The Mother",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    text: "The future of the Earth depends on a change of consciousness.",
    author: "Sri Aurobindo",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  }
];

export default function WelcomeBanner() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextQuote, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-64 rounded-xl overflow-hidden">
      <img
        src={quotes[currentIndex].image}
        alt="Auroville"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-xl italic mb-2">"{quotes[currentIndex].text}"</p>
          <p className="text-sm">— {quotes[currentIndex].author}</p>
        </div>
      </div>
      
      <button
        onClick={prevQuote}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextQuote}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}