import { useState } from 'react';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { TranslationCard } from '@/components/TranslationCard';
import { LoadingWave } from '@/components/LoadingWave';

const LANGUAGES = [
  { name: 'Russian', code: 'ru', flag: '🇷🇺' },
  { name: 'Turkish', code: 'tr', flag: '🇹🇷' },
  { name: 'Swedish', code: 'sv', flag: '🇸🇪' },
  { name: 'German', code: 'de', flag: '🇩🇪' },
  { name: 'Spanish', code: 'es', flag: '🇪🇸' },
  { name: 'Japanese', code: 'ja', flag: '🇯🇵' },
];

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setTranslations({});
    
    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock translations
    const mockTranslations = {
      ru: 'Привет, как дела?',
      tr: 'Merhaba, nasılsın?',
      sv: 'Hej, hur mår du?',
      de: 'Hallo, wie geht es dir?',
      es: 'Hola, ¿cómo estás?',
      ja: 'こんにちは、元気ですか？',
    };
    
    setTranslations(mockTranslations);
    setIsProcessing(false);
  };

  const handleFileUpload = async (file: File) => {
    handleRecordingComplete(new Blob()); // Simulate same flow
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient - Updated to black to gray */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-700 opacity-95" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4">
            🎙️ Voice-to-Voice Translator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Record your voice in English and get instant translations in multiple languages with audio playback.
          </p>
        </header>

        {/* Recording Section */}
        <div className="max-w-md mx-auto mb-12">
          <VoiceRecorder 
            onRecordingComplete={handleRecordingComplete}
            onFileUpload={handleFileUpload}
          />
        </div>

        {/* Loading State */}
        {isProcessing && (
          <div className="mb-12">
            <LoadingWave message="Translating your voice..." />
          </div>
        )}

        {/* Translation Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary-foreground mb-8">
            Translations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {LANGUAGES.map((language) => (
              <TranslationCard
                key={language.code}
                language={language.name}
                languageCode={language.code}
                flag={language.flag}
                translatedText={translations[language.code]}
                isLoading={isProcessing}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-muted-foreground">
            Made with ❤️ by <span className="text-accent font-semibold">VISHAL</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
