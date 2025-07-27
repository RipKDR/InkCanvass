export default function ScrollIndicator() {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-8 h-12 border-2 border-zinc-400/30 rounded-full cursor-pointer transition-colors hover:border-red-800 group"
      onClick={handleScrollDown}
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-zinc-50 rounded-full animate-bounce group-hover:bg-red-800"></div>
    </div>
  );
}
