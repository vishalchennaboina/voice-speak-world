import { useState, useRef } from 'react';
import { Mic, MicOff, Upload, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  onFileUpload?: (file: File) => void;
}

export const VoiceRecorder = ({ onRecordingComplete, onFileUpload }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        onRecordingComplete?.(audioBlob);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.includes('audio') || file.name.endsWith('.wav') || file.name.endsWith('.mp3'))) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      onFileUpload?.(file);
    }
  };

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  return (
    <Card className="glass-card p-8 text-center">
      <div className="space-y-6">
        {/* Main Recording Button */}
        <div className="flex justify-center">
          <Button
            size="default"
            className={`mic-button px-6 py-3 ${
              isRecording ? 'recording-pulse' : ''
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 mr-2" />
            ) : (
              <Mic className="w-5 h-5 mr-2" />
            )}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-primary-foreground">
            {isRecording ? 'Recording...' : 'Record Your Voice'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isRecording 
              ? 'Speak clearly and click to stop recording' 
              : 'Click the microphone to start recording'
            }
          </p>
        </div>

        {/* Upload Option */}
        <div className="relative">
          <Button
            variant="outline"
            className="w-full bg-card/50 border-card-border text-card-foreground hover:bg-card/70"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Audio File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.wav,.mp3"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Audio Playback */}
        {audioURL && (
          <div className="pt-4 border-t border-card-border">
            <Button
              variant="secondary"
              size="sm"
              onClick={playAudio}
              className="bg-secondary/80 text-secondary-foreground hover:bg-secondary"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Play Recording
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};