interface SoundWavesProps {
  isActive: boolean;
}

export const SoundWaves = ({ isActive }: SoundWavesProps) => {
  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center space-x-1 h-12 my-4">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="sound-wave-bar w-1 bg-accent rounded-full"
          style={{ height: '8px' }}
        />
      ))}
    </div>
  );
};