# AI Story Generator

A beautiful, modern web application that generates creative short stories using Google's Gemini AI. Users can customize stories by choosing different genres, tones, and lengths.

## Features

- 🎨 **Modern UI Design** - Beautiful gradient background with glassmorphism effects
- 🤖 **AI-Powered** - Uses Google Gemini API for intelligent story generation
- 📚 **Multiple Genres** - Fantasy, Sci-Fi, Mystery, Romance, Thriller, Horror, Adventure, Historical, Comedy, Drama
- 🎭 **Customizable Tones** - Funny, Serious, Romantic, Dark, Whimsical, Inspirational, Suspenseful, Nostalgic
- 📏 **Variable Lengths** - Short (100-200 words), Medium (200-400 words), Long (400-600 words)
- 💾 **Story Management** - Copy to clipboard, download as text file
- 🔄 **Regenerate** - Create new variations of stories
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Real-time Validation** - Form validation with helpful feedback
- 🎯 **Loading States** - Beautiful loading animations and error handling

## Demo

The application features a clean, intuitive interface where users can:
1. Enter their story prompt or idea
2. Select a genre from the dropdown
3. Choose a tone/style for the story
4. Pick the desired story length
5. Click "Generate Story" to create their unique story

## Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Google Gemini API key

### Getting Your Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. Open the `script.js` file and replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key on line 4

### Installation

1. Clone or download this repository
2. Open the `script.js` file and replace `YOUR_GEMINI_API_KEY_HERE` with your actual Google Gemini API key on line 4
3. Open the `index.html` file in your web browser
4. Start generating stories!

## Usage

1. **Enter Your Prompt**: Type your story idea, theme, or keywords in the text area
2. **Select Genre**: Choose from 10 different genres
3. **Choose Tone**: Pick the mood and style you want
4. **Set Length**: Select short, medium, or long story length
5. **Generate**: Click the "Generate Story" button
6. **Enjoy**: Read your generated story and use the action buttons to copy, download, or regenerate

## File Structure

```
ai-story-generator/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # Modern CSS with responsive design
├── script.js           # JavaScript functionality with Gemini API integration
└── README.md           # This documentation file
```

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript** - No frameworks required, pure JS implementation
- **Google Gemini API** - AI-powered content generation

### Key Features Implementation
- **API Integration**: Secure API key storage in localStorage
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Smooth loading animations during story generation
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized API calls and efficient DOM manipulation

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## API Configuration

The application uses the Google Gemini API with the following settings:
- Model: `gemini-pro`
- Temperature: 0.8 (balanced creativity)
- Top-K: 40
- Top-P: 0.95
- Max Output Tokens: 1024
- Safety settings: Medium blocking for all categories

## Security Notes

- API key is stored directly in the JavaScript file
- No server-side storage of API keys or generated content
- All API calls are made directly from the client
- Content is filtered through Google's safety settings
- **Important**: Keep your API key secure and don't share the script.js file publicly

## Troubleshooting

### Common Issues

1. **Invalid API Key Error**
   - Ensure you've copied the correct API key from Google AI Studio
   - Check that the API key is properly pasted without extra spaces

2. **Quota Exceeded Error**
   - Google Gemini has usage limits
   - Try again later or check your API usage in Google Cloud Console

3. **Network Connection Error**
   - Check your internet connection
   - Ensure firewall isn't blocking API requests

4. **Story Generation Fails**
   - Try simplifying your prompt
   - Ensure all form fields are filled out
   - Check browser console for detailed error messages

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is valid and active
3. Ensure you have a stable internet connection
4. Try refreshing the page and re-entering your API key

## Future Enhancements

- [ ] Story history and saved stories
- [ ] Multiple story export formats (PDF, DOCX)
- [ ] Story sharing via social media
- [ ] Custom genre and tone options
- [ ] Story rating and feedback system
- [ ] Collaborative story creation
- [ ] Story illustrations using AI image generation

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for bugs and feature requests.

---

**Generated by AI Story Generator**  
*Powered by Google Gemini*
