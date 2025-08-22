"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiVoiceChatbot } from '@/ai/flows/ai-voice-chatbot';
import { Bot, Loader2, Send, User, X, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  audio?: string;
  id: number;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm an AI assistant. Ask me anything about Deepak Kumar and I'll answer in voice.", id: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const playAudio = (audioSrc: string, messageId: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    const newAudio = new Audio(audioSrc);
    audioRef.current = newAudio;

    newAudio.onplay = () => setPlayingAudioId(messageId);
    newAudio.onpause = () => setPlayingAudioId(null);
    newAudio.onended = () => setPlayingAudioId(null);
    
    newAudio.play().catch(err => {
      console.error("Audio play failed:", err);
      toast({ title: "Playback Error", description: "Could not play audio.", variant: "destructive" });
      setPlayingAudioId(null);
    });
  };

  const handleSpeakerClick = (message: Message) => {
    if (playingAudioId === message.id) {
      audioRef.current?.pause();
    } else if (message.audio) {
      playAudio(message.audio, message.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await aiVoiceChatbot({ question: input });
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: result.answer, 
        audio: result.audio,
        id: Date.now() + 1 
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      if (result.audio) {
        playAudio(result.audio, assistantMessage.id);
      }

    } catch (error) {
      console.error("Chatbot error:", error);
      toast({
        title: "Chatbot Error",
        description: "Sorry, I couldn't get a response. Please try again.",
        variant: "destructive",
      });
      // Remove the user's message if the API call fails
      setMessages((prev) => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg shadow-primary/40 bg-gradient-to-br from-primary to-accent text-primary-foreground"
          aria-label="Open chatbot"
        >
          <Bot className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[calc(100vw-2rem)] sm:w-96 h-[70vh] p-0 flex flex-col mr-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Deepak's AI Assistant</h3>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex items-start gap-3', {
                  'justify-end': message.role === 'user',
                })}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-3 py-2 text-sm flex items-center gap-2',
                    {
                      'bg-primary text-primary-foreground': message.role === 'user',
                      'bg-secondary': message.role === 'assistant',
                    }
                  )}
                >
                  <span>{message.content}</span>
                  {message.audio && (
                    <button onClick={() => handleSpeakerClick(message)} className="focus:outline-none focus:ring-2 focus:ring-ring rounded-full p-1">
                      {playingAudioId === message.id ? (
                        <VolumeX className="h-4 w-4 text-accent" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                  )}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                <div className="bg-secondary rounded-lg px-3 py-2 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 border-t flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
