import { Loader2 } from 'lucide-react';

interface LoadingWaveProps {
  message?: string;
}

export const LoadingWave = ({ message = "Processing..." }: LoadingWaveProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-accent loading-spinner" />
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse"></div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-primary-foreground font-medium">{message}</p>
        <div className="flex space-x-1 justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-accent rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};