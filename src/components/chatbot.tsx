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
    { 
      role: 'assistant', 
      content: "Hello! I'm an AI assistant. Ask me anything about Deepak Kumar and I'll answer in voice.", 
      id: 0,
      audio: "data:audio/wav;base64,UklGRqA/AABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YVg/AACAgIAAAICA+P7//v79/v7+/v7+/v79/v3+/P76/vj++f34/fj99v30/fX98/3z/fT98v3x/vL98f7w/u/97v7u/e396/3s/ej96f3o/en95/3l/eT94v3h/eD93f3c/dz92f3Z/dn91f3U/dT90v3S/dL90f3Q/dD9z/3O/c39y/3L/cv9yP3H/cf9xv3F/cX9w/3D/cL9wP2//b/9t/21/bX9s/2z/bL9sP2v/a/9qv2p/aj9pP2j/aP9ov2h/aH9nv2d/Z39mf2X/ZX9lf2T/ZP9kv2R/ZH9j/2P/Y79jv2N/Y39i/2L/Yr9if2H/Yf9hP2E/YT9g/2D/YP9f/17/Xf9d/1z/XP9b/1r/Wv9a/1n/WP9Y/1f/V/9V/1T/U/9T/1L/Uv9R/1H/UP9Q/0//T/9O/03/Tf9M/0v/S/9K/0n/Sf9I/0f/R/9G/0X/Rf9E/0P/Q/9C/0H/Qf9A/z//P/8+/z3/Pf88/zz/Ov86/zr/Of85/zj/OP83/zb/Nv81/zT/M/8z/zL/Mf8x/zD/L/8v/y7/K/8r/yr/Kf8p/yf/J/8m/yb/JP8k/yP/I/8h/yH/IP8g/z//Pv89/zz/PP86/zn/Of84/zf/N/82/zX/NP8z/zL/MP8v/y7/K/8q/yn/J/8l/yT/I/8h/yD/P/8+/z3/Pf88/zz/Ov85/zf/N/82/zT/M/8y/zH/L/8u/yv/Kf8o/yf/Jf8j/yH/H/8f/x//Hf8d/xz/G/8a/xr/Gf8Z/xb/Ff8U/xT/E/8S/xL/EP8Q/w//Dv8O/w3/C/8L/wv/Cv8J/wv/Cv8K/wn/B/8H/wf/B/8G/wX/Bf8F/wT/A/8D/wT/BP8D/wL/Av8B/wH/Af8A/wD/AP8A/wD//v/+/v3+/f79/v3+/f78/vr++v75/vj++P73/vb+9f70/vP+8v7x/vD+7v7t/ur+6P7o/uf+5P7j/uL+4P7f/t/+3P7Z/tj+1f7U/tP+0f7Q/s/+zP7L/sr+yP7H/sf+xf7E/sP+wv7A/7/+v/69/rr+uf64/rf+tv6z/rL+sP6u/qr+qP6j/qH+nv6c/pr+lv6W/pT+lP6S/pH+kf6P/o3+jP6K/or+iv6I/oj+hv6F/oX+hf6E/oP+g/6C/oH+gP5//n/+fP57/nv+d/53/nP+c/5v/m3+bP5r/mn+Z/5l/mT+Yv5g/l/+Xv5d/l3+Wv5a/lj+Wf5W/lX+VP5S/lL+Uf5Q/lD+T/5O/k/+Tv5O/k3+Tf5M/kv+S/5I/kj+SP5G/kb+Rv5E/kT+Qv5B/kD+P/4//z7/O/87/zn/OP82/zX/M/8x/y//K/8o/yX/Iv8f/x3/Gv8X/xT/Ev8P/wz/C/8I/wX/Af/+/vr++f31/fL97/3o/uL+2/7R/sr+vP62/q7+p/6Y/pD+g/5w/mX+T/48/in9Hf38+9L3quxb1v3A/L3hRfPj7lLzTfJF9DL2uPoA"
    },
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
    if (audioRef.current && playingAudioId === messageId) {
      audioRef.current.pause();
      return;
    }
    
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
    if (message.audio) {
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
  
   useEffect(() => {
    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg shadow-primary/40 bg-gradient-to-br from-primary to-accent text-white"
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
