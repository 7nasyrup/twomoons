export default function GameFrame({ children, uiLayer }) {
  return (
    <div className="w-screen h-screen bg-[#000000] flex items-center justify-center overflow-hidden">
      <div
        id="game-canvas-wrapper"
        className="relative overflow-hidden bg-luna-abyss"
        style={{
          aspectRatio: '16 / 9',
          width: '100vw',
          maxHeight: '100vh',
          maxWidth: '177.78vh',
        }}
      >
        <div className="absolute inset-0">
          {children}
        </div>
        {uiLayer && (
          <div className="absolute inset-0 z-[100]">
            {uiLayer}
          </div>
        )}
      </div>
    </div>
  );
}
