// API utilities for chatbot backend integration
export interface ChatMessage {
    message: string;
    sender: 'user' | 'bot';
    timestamp: string;
    messageId?: string;
}

export interface ChatResponse {
    response: string;
    messageId: string;
    suggestions?: string[];
    requiresAction?: {
        type: 'symptom_check' | 'vaccination' | 'outbreak' | 'feedback';
        data?: any;
    };
}

export interface SymptomCheckRequest {
    symptoms: string[];
    age?: number;
    gender?: string;
    location?: string;
}

export interface SymptomCheckResponse {
    possibleConditions: Array<{
        condition: string;
        probability: number;
        severity: 'low' | 'medium' | 'high';
        recommendations: string[];
    }>;
    nearestHealthCenter?: {
        name: string;
        address: string;
        phone: string;
        distance: string;
    };
}

// Base API configuration
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class HealthChatbotAPI {
    // Add chat history management
    private chatHistories: Map<
        string,
        Array<{ role: 'user' | 'model'; parts: string[] }>
    > = new Map();

    private async makeRequest<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        // Update the base URL to your AI API
        const url = endpoint.startsWith('http')
            ? endpoint
            : `${API_BASE_URL}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...defaultHeaders,
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(
                    `API Error: ${response.status} ${response.statusText}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Updated sendMessage method for your AI API
    async sendMessage(
        message: string,
        conversationId: string
    ): Promise<ChatResponse> {
        // Get or initialize chat history for this conversation
        let chatHistory = this.chatHistories.get(conversationId) || [];

        try {
            // Make request to your AI API endpoint
            const response = await this.makeRequest<{ response: string }>(
                `${API_BASE_URL}/chat`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        user_query: message,
                        history: chatHistory,
                    }),
                }
            );

            // Update chat history with user message and AI response
            chatHistory.push(
                { role: 'user', parts: [message] },
                { role: 'model', parts: [response.response] }
            );

            // Store updated history
            this.chatHistories.set(conversationId, chatHistory);

            return {
                response: response.response,
                messageId: `msg_${Date.now()}`,
                suggestions: this.extractSuggestions(response.response),
            };
        } catch (error) {
            console.error('AI API error:', error);
            throw error;
        }
    }

    // Helper method to extract suggestions from AI response
    private extractSuggestions(response: string): string[] {
        // Extract suggestions based on response content
        const suggestions: string[] = [];

        if (response.toLowerCase().includes('symptom')) {
            suggestions.push('Check symptoms', 'Find nearby clinic');
        }
        if (response.toLowerCase().includes('vaccin')) {
            suggestions.push('Vaccination schedule', 'Set reminder');
        }
        if (
            response.toLowerCase().includes('outbreak') ||
            response.toLowerCase().includes('alert')
        ) {
            suggestions.push('Current alerts', 'Prevention tips');
        }
        if (
            response.toLowerCase().includes('emergency') ||
            response.toLowerCase().includes('urgent')
        ) {
            suggestions.push('Emergency contacts', 'Call 108');
        }

        return suggestions.slice(0, 3); // Limit to 3 suggestions
    }

    // Method to clear conversation history
    clearConversationHistory(conversationId: string): void {
        this.chatHistories.delete(conversationId);
    }

    // Symptom checker endpoints
    async checkSymptoms(
        request: SymptomCheckRequest
    ): Promise<SymptomCheckResponse> {
        return this.makeRequest<SymptomCheckResponse>('/symptoms/check', {
            method: 'POST',
            body: JSON.stringify(request),
        });
    }

    // Vaccination endpoints
    async getVaccinationSchedule(age: number, location?: string) {
        return this.makeRequest(
            `/vaccination/schedule?age=${age}&location=${location || ''}`
        );
    }

    async setVaccinationReminder(
        vaccineId: string,
        reminderDate: string,
        phone: string
    ) {
        return this.makeRequest('/vaccination/reminder', {
            method: 'POST',
            body: JSON.stringify({
                vaccineId,
                reminderDate,
                phone,
            }),
        });
    }

    // Outbreak alerts endpoints
    async getOutbreakAlerts(location?: string) {
        return this.makeRequest(`/outbreak/alerts?location=${location || ''}`);
    }

    async subscribeToAlerts(phone: string, location: string) {
        return this.makeRequest('/outbreak/subscribe', {
            method: 'POST',
            body: JSON.stringify({
                phone,
                location,
            }),
        });
    }

    // Feedback endpoints
    async submitFeedback(feedback: {
        rating: number;
        category: string;
        comments?: string;
        userId?: string;
    }) {
        return this.makeRequest('/feedback/submit', {
            method: 'POST',
            body: JSON.stringify(feedback),
        });
    }

    // Health tips endpoint
    async getHealthTips(category?: string, language?: string) {
        return this.makeRequest(
            `/health/tips?category=${category || ''}&language=${
                language || 'english'
            }`
        );
    }
}

// Create singleton instance
export const healthAPI = new HealthChatbotAPI();

// Mock responses for development/testing
export const mockResponses = {
    chat: {
        response:
            "I understand your concern. Based on what you've told me, I can help you with symptom checking, vaccination information, or general health guidance. What would you like to explore?",
        messageId: Date.now().toString(),
        suggestions: ['Check symptoms', 'Vaccination info', 'Health tips'],
    },

    symptoms: {
        possibleConditions: [
            {
                condition: 'Common Cold',
                probability: 75,
                severity: 'low' as const,
                recommendations: [
                    'Rest and hydration',
                    'Over-the-counter medications',
                    'Monitor symptoms',
                ],
            },
            {
                condition: 'Seasonal Flu',
                probability: 60,
                severity: 'medium' as const,
                recommendations: [
                    'Consult healthcare provider',
                    'Antiviral medication if needed',
                    'Isolation',
                ],
            },
        ],
        nearestHealthCenter: {
            name: 'Government Primary Health Center',
            address: 'Main Road, Sector 15, Bhubaneswar',
            phone: '+91-674-2345678',
            distance: '2.3 km',
        },
    },
};

// Utility function to simulate API delay for development
export const simulateAPIDelay = (ms = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms));
