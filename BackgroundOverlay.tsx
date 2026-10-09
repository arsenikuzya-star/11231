import bgDark from '../assets/bg-dark.jpg';

export default function BackgroundOverlay() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `url(${bgDark})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        opacity: 0.12,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
