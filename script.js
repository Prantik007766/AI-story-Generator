// AI Story Generator JavaScript
class StoryGenerator {
    constructor() {
        this.apiKey = 'AIzaSyCRFeaa8vTWypPGDWMDSRe5nBFVTB7_7Gs' // <-- PASTE YOUR API KEY HERE
        this.currentStory = '';
        this.isGenerating = false;
        
        this.initializeElements();
        this.bindEvents();
        this.checkApiKey();
    }

    initializeElements() {
        // Form elements
        this.form = document.getElementById('storyForm');
        this.promptInput = document.getElementById('prompt');
        this.genreSelect = document.getElementById('genre');
        this.toneSelect = document.getElementById('tone');
        this.lengthSelect = document.getElementById('length');
        this.generateBtn = document.getElementById('generateBtn');

        // Result elements
        this.resultContainer = document.getElementById('resultContainer');
        this.storyContent = document.getElementById('storyContent');
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.regenerateBtn = document.getElementById('regenerateBtn');

        // Loading and error elements
        this.loadingContainer = document.getElementById('loadingContainer');
        this.errorContainer = document.getElementById('errorContainer');
        this.errorMessage = document.getElementById('errorMessage');
        this.retryBtn = document.getElementById('retryBtn');
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateStory();
        });

        // Action buttons
        this.copyBtn.addEventListener('click', () => this.copyStory());
        this.downloadBtn.addEventListener('click', () => this.downloadStory());
        this.regenerateBtn.addEventListener('click', () => this.generateStory());
        this.retryBtn.addEventListener('click', () => this.generateStory());

        // Input validation
        this.promptInput.addEventListener('input', () => this.validateForm());
        this.genreSelect.addEventListener('change', () => this.validateForm());
        this.toneSelect.addEventListener('change', () => this.validateForm());

        // Character counter for prompt
        this.promptInput.addEventListener('input', () => this.updateCharCounter());
    }

    checkApiKey() {
        // Check if API key is set in the file
        if (!this.apiKey || this.apiKey === 'AIzaSyCRFeaa8vTWypPGDWMDSRe5nBFVTB7_7Gs') {
            this.showError('Please set your Google Gemini API key in the script.js file. Replace "YOUR_GEMINI_API_KEY_HERE" with your actual API key.');
            return false;
        }
        return true;
    }

    validateForm() {
        const isValid = this.promptInput.value.trim() !== '' && 
                       this.genreSelect.value !== '' && 
                       this.toneSelect.value !== '';
        
        this.generateBtn.disabled = !isValid || this.isGenerating;
        return isValid;
    }

    updateCharCounter() {
        const charCount = this.promptInput.value.length;
        const maxLength = 500;
        
        if (charCount > maxLength) {
            this.promptInput.value = this.promptInput.value.substring(0, maxLength);
        }
    }

    async generateStory() {
        if (!this.validateForm() || this.isGenerating) return;

        // Check if API key is set
        if (!this.checkApiKey()) return;

        this.isGenerating = true;
        this.generateBtn.disabled = true;
        
        // Hide previous results/errors
        this.hideAllStates();
        this.showLoading();

        try {
            const prompt = this.buildPrompt();
            const story = await this.callGeminiAPI(prompt);
            
            this.currentStory = story;
            this.displayStory(story);
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.isGenerating = false;
            this.generateBtn.disabled = false;
            this.hideLoading();
        }
    }

    buildPrompt() {
        const userPrompt = this.promptInput.value.trim();
        const genre = this.genreSelect.value;
        const tone = this.toneSelect.value;
        const length = this.lengthSelect.value;

        const genreDescriptions = {
            fantasy: "fantasy world with magic, mythical creatures, and epic adventures",
            scifi: "science fiction setting with advanced technology, space exploration, or future societies",
            mystery: "mystery with suspense, clues, and an intriguing puzzle to solve",
            romance: "romantic story with emotional connections and relationships",
            thriller: "thriller with tension, suspense, and edge-of-your-seat excitement",
            horror: "horror story with fear, suspense, and chilling elements",
            adventure: "adventure with exciting journeys, challenges, and discoveries",
            historical: "historical fiction set in a specific time period with authentic details",
            comedy: "comedy with humor, wit, and entertaining situations",
            drama: "drama with emotional depth, character development, and meaningful conflicts"
        };

        const toneDescriptions = {
            funny: "humorous, lighthearted, and entertaining with witty dialogue",
            serious: "serious, thoughtful, and meaningful with emotional depth",
            romantic: "romantic, heartfelt, and emotionally touching",
            dark: "dark, mysterious, and atmospheric with shadowy elements",
            whimsical: "whimsical, playful, and imaginative with creative elements",
            inspirational: "inspirational, uplifting, and motivational",
            suspenseful: "suspenseful, tense, and gripping with anticipation",
            nostalgic: "nostalgic, reflective, and sentimental with warm memories"
        };

        const lengthDescriptions = {
            short: "approximately 100-200 words",
            medium: "approximately 200-400 words",
            long: "approximately 400-600 words"
        };

        const prompt = `Write a ${genreDescriptions[genre]} story with a ${toneDescriptions[tone]} tone. The story should be ${lengthDescriptions[length]}. 

Main prompt: ${userPrompt}

Please create a compelling, well-written story that captures the essence of the genre and tone. Make it engaging and coherent with a clear beginning, middle, and end. Ensure the story is appropriate for general audiences and demonstrates creative storytelling.`;

        return prompt;
    }

    async callGeminiAPI(prompt) {
        const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
        
        console.log('Making API call with key:', this.apiKey.substring(0, 10) + '...');
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.8,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        try {
            const response = await fetch(`${apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            console.log('API Response Status:', response.status);
            console.log('API Response Headers:', response.headers);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error Response:', errorData);
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            console.log('API Success Response:', data);
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text.trim();
            } else {
                console.error('Invalid response structure:', data);
                throw new Error('No story generated. Please try again.');
            }
            
        } catch (error) {
            console.error('API Call Error:', error);
            
            if (error.message.includes('API Error') && error.message.includes('INVALID_ARGUMENT')) {
                throw new Error('Invalid API key. Please check your Gemini API key and try again.');
            } else if (error.message.includes('API Error') && error.message.includes('PERMISSION_DENIED')) {
                throw new Error('API permission denied. Please check your API key permissions.');
            } else if (error.message.includes('API Error') && error.message.includes('QUOTA_EXCEEDED')) {
                throw new Error('API quota exceeded. Please try again later or check your usage limits.');
            } else if (error.message.includes('Failed to fetch')) {
                throw new Error('Network error. Please check your internet connection and try again.');
            } else {
                throw new Error('Failed to generate story: ' + error.message);
            }
        }
    }

    displayStory(story) {
        this.storyContent.textContent = story;
        this.resultContainer.style.display = 'block';
        
        // Smooth scroll to result
        this.resultContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    showLoading() {
        this.loadingContainer.style.display = 'block';
    }

    hideLoading() {
        this.loadingContainer.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorContainer.style.display = 'block';
        
        // Smooth scroll to error
        this.errorContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    hideAllStates() {
        this.resultContainer.style.display = 'none';
        this.errorContainer.style.display = 'none';
        this.loadingContainer.style.display = 'none';
    }

    async copyStory() {
        try {
            await navigator.clipboard.writeText(this.currentStory);
            
            // Show success feedback
            const originalIcon = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            this.copyBtn.style.background = '#10b981';
            this.copyBtn.style.color = 'white';
            
            setTimeout(() => {
                this.copyBtn.innerHTML = originalIcon;
                this.copyBtn.style.background = '';
                this.copyBtn.style.color = '';
            }, 2000);
            
        } catch (error) {
            console.error('Failed to copy story:', error);
            // Fallback for older browsers
            this.fallbackCopyToClipboard(this.currentStory);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            // Show success feedback
            const originalIcon = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            this.copyBtn.style.background = '#10b981';
            this.copyBtn.style.color = 'white';
            
            setTimeout(() => {
                this.copyBtn.innerHTML = originalIcon;
                this.copyBtn.style.background = '';
                this.copyBtn.style.color = '';
            }, 2000);
        } catch (error) {
            console.error('Fallback copy failed:', error);
        }
        
        document.body.removeChild(textArea);
    }

    downloadStory() {
        const storyText = this.currentStory;
        const genre = this.genreSelect.options[this.genreSelect.selectedIndex].text;
        const tone = this.toneSelect.options[this.toneSelect.selectedIndex].text;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        
        const filename = `story_${genre.toLowerCase()}_${tone.toLowerCase()}_${timestamp}.txt`;
        
        const content = `AI Generated Story
===================

Genre: ${genre}
Tone: ${tone}
Generated: ${new Date().toLocaleString()}

${storyText}

---
Generated by AI Story Generator
Powered by Google Gemini
        `;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success feedback
        const originalIcon = this.downloadBtn.innerHTML;
        this.downloadBtn.innerHTML = '<i class="fas fa-check"></i>';
        this.downloadBtn.style.background = '#10b981';
        this.downloadBtn.style.color = 'white';
        
        setTimeout(() => {
            this.downloadBtn.innerHTML = originalIcon;
            this.downloadBtn.style.background = '';
            this.downloadBtn.style.color = '';
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StoryGenerator();
});

// Add some additional utility functions
window.addEventListener('load', () => {
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to generate story
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const form = document.getElementById('storyForm');
            if (form.checkValidity()) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const modal = document.querySelector('.api-key-modal');
            if (modal) {
                modal.remove();
            }
        }
    });
});
