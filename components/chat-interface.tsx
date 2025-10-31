'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    Send,
    Mic,
    MicOff,
    Thermometer,
    Syringe,
    AlertTriangle,
    Heart,
    MessageSquare,
} from 'lucide-react';
import { healthAPI, mockResponses, simulateAPIDelay } from '@/lib/api';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    suggestions?: string[];
}

interface ChatInterfaceProps {
    onBack: () => void;
    onNavigate: (screen: string) => void;
    language: string;
}

export default function ChatInterface({
    onBack,
    onNavigate,
    language,
}: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your AI health assistant. How can I help you with your health concerns today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasStartedChatting, setHasStartedChatting] = useState(false);
    const [conversationId] = useState(() => `conv_${Date.now()}`);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const quickActions = {
        english: [
            { icon: Thermometer, text: 'Check Symptoms', action: 'symptoms' },
            // {
            //     icon: Syringe,
            //     text: 'Vaccination Reminders',
            //     action: 'vaccination',
            // },
            // {
            //     icon: AlertTriangle,
            //     text: 'Outbreak Alerts',
            //     action: 'outbreak',
            // },
            { icon: MessageSquare, text: 'Give Feedback', action: 'feedback' },
        ],
        hindi: [
            { icon: Thermometer, text: 'लक्षण जांचें', action: 'symptoms' },
            // { icon: Syringe, text: 'टीकाकरण अनुस्मारक', action: 'vaccination' },
            // { icon: AlertTriangle, text: 'प्रकोप अलर्ट', action: 'outbreak' },
            { icon: MessageSquare, text: 'फीडबैक दें', action: 'feedback' },
        ],
        odia: [
            {
                icon: Thermometer,
                text: 'ଲକ୍ଷଣ ଯାଞ୍ଚ କରନ୍ତୁ',
                action: 'symptoms',
            },
            // { icon: Syringe, text: 'ଟିକାକରଣ ସ୍ମାରକ', action: 'vaccination' },
            // { icon: AlertTriangle, text: 'ପ୍ରକୋପ ଆଲର୍ଟ', action: 'outbreak' },
            { icon: MessageSquare, text: 'ମତାମତ ଦିଅନ୍ତୁ', action: 'feedback' },
        ],
    };

    const currentActions =
        quickActions[language as keyof typeof quickActions] ||
        quickActions.english;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        if (!hasStartedChatting) {
            setHasStartedChatting(true);
        }

        try {
            // Use your AI API
            const response = await healthAPI.sendMessage(
                inputText,
                conversationId
            );

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.response,
                sender: 'bot',
                timestamp: new Date(),
                suggestions: response.suggestions,
            };

            setMessages((prev) => [...prev, botMessage]);

            // Check for specific AI responses that should trigger navigation
            const responseText = response.response.toLowerCase();
            if (
                responseText.includes('emergency contact') ||
                responseText.includes('talk to a person')
            ) {
                // Add emergency contact info
                setTimeout(() => {
                    const emergencyMessage: Message = {
                        id: (Date.now() + 2).toString(),
                        text: '🚨 Emergency Contacts:\n• National Emergency: 108\n• Women Helpline: 1091\n• Child Helpline: 1098\n• COVID-19 Helpline: 1075',
                        sender: 'bot',
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, emergencyMessage]);
                }, 1000);
            }
        } catch (error) {
            console.error('Error sending message:', error);

            // Fallback to mock response if AI API fails
            try {
                await simulateAPIDelay(1500);
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: mockResponses.chat.response,
                    sender: 'bot',
                    timestamp: new Date(),
                    suggestions: mockResponses.chat.suggestions,
                };
                setMessages((prev) => [...prev, botMessage]);
            } catch (mockError) {
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment or contact emergency services if this is urgent.",
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Enhanced quick action handler
    const handleQuickAction = (action: string) => {
        const actionMessages = {
            symptoms: "I'd like to check my symptoms and get health guidance. My symptoms are: ",
            vaccination:
                'Can you help me with vaccination information and reminders?',
            outbreak:
                'Tell me about current health alerts and outbreak information',
            feedback: 'I want to provide feedback about this health service',
        };

        const userMessage: Message = {
            id: Date.now().toString(),
            text: actionMessages[action as keyof typeof actionMessages],
            sender: 'user',
            timestamp: new Date(),
        };

        // setMessages((prev) => [...prev, userMessage]);
        setInputText(actionMessages[action as keyof typeof actionMessages]);

        // // Send the message through AI API
        // setTimeout(() => sendMessage(), 100);

        // // Navigate to specific screen after AI response
        // setTimeout(() => {
        //     onNavigate(action);
        // }, 2000);
    };

    // Clear conversation when component unmounts
    useEffect(() => {
        return () => {
            healthAPI.clearConversationHistory(conversationId);
        };
    }, [conversationId]);

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // In a real app, this would start/stop voice recording
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold">Health Assistant</h2>
                        <p className="text-sm text-muted-foreground">
                            {isLoading ? 'Typing...' : 'Online'}
                        </p>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === 'user'
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl ${
                                message.sender === 'user'
                                    ? 'bg-primary text-primary-foreground chat-bubble-sent'
                                    : 'bg-card border chat-bubble'
                            }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            {message.suggestions &&
                                message.suggestions.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {message.suggestions.map(
                                            (suggestion, index) => (
                                                <button
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                                                    onClick={() => {
                                                        setInputText(
                                                            suggestion
                                                        );
                                                    }}
                                                >
                                                    {suggestion}
                                                </button>
                                            )
                                        )}
                                    </div>
                                )}
                            <p
                                className={`text-xs mt-1 ${
                                    message.sender === 'user'
                                        ? 'text-primary-foreground/70'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-card border rounded-2xl p-3 max-w-[80%]">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div
                                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                        style={{ animationDelay: '0ms' }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                        style={{ animationDelay: '150ms' }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                        style={{ animationDelay: '300ms' }}
                                    ></div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    Assistant is typing...
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {!hasStartedChatting && (
                <div className="p-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {currentActions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="h-auto p-3 flex flex-col items-center gap-2 text-xs bg-transparent"
                                onClick={() => handleQuickAction(action.action)}
                            >
                                <action.icon className="w-4 h-4" />
                                <span className="text-center leading-tight">
                                    {action.text}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <Input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            className="pr-12 rounded-full"
                            onKeyPress={(e) =>
                                e.key === 'Enter' && sendMessage()
                            }
                            disabled={isLoading}
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                            onClick={toggleRecording}
                            disabled={isLoading}
                        >
                            {isRecording ? (
                                <MicOff className="w-4 h-4 text-destructive" />
                            ) : (
                                <Mic className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    <Button
                        size="icon"
                        className="rounded-full"
                        onClick={sendMessage}
                        disabled={!inputText.trim() || isLoading}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
