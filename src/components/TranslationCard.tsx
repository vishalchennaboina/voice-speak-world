import { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TranslationCardProps {
  language: string;
  languageCode: string;
  translatedText?: string;
  isLoading?: boolean;
  flag: string;
}

export const TranslationCard = ({ 
  language, 
  languageCode, 
  translatedText, 
  isLoading = false,
  flag 
}: TranslationCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    if (!translatedText || isPlaying) return;
    
    setIsPlaying(true);
    
    // Simulate audio playback (replace with actual TTS implementation)
    try {
      // Here you would integrate with a TTS service like ElevenLabs
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <Card className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={language}>
            {flag}
          </span>
          <div>
            <h3 className="font-semibold text-card-foreground">{language}</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {languageCode}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlayAudio}
          disabled={!translatedText || isPlaying || isLoading}
          className="text-accent hover:text-accent-foreground hover:bg-accent/20"
        >
          {isPlaying ? (
            <Loader2 className="w-4 h-4 loading-spinner" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[120px]">
        {isLoading ? (
          <div className="wave-animation w-full h-8 bg-muted/30 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Translating...</span>
          </div>
        ) : translatedText ? (
          <p className="text-card-foreground text-center text-lg leading-relaxed">
            {translatedText}
          </p>
        ) : (
          <p className="text-muted-foreground text-center text-sm">
            Ready for translation
          </p>
        )}
      </div>
    </Card>
  );
};