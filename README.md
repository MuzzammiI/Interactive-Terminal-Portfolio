# Interactive Terminal Portfolio

A modern, interactive terminal-based portfolio built with React, Vite, and Tailwind CSS. Experience a unique command-line interface that showcases skills, projects, experience, and achievements in an engaging way.

## 🚀 Live Demo

Visit the live portfolio: [https://MuzzammiI.github.io/Interactive-Terminal-Portfolio/](https://MuzzammiI.github.io/Interactive-Terminal-Portfolio/)

## ✨ Features

- **Command-Line Interface**: Type commands just like in a real terminal
- **Command History**: Navigate through previous commands with arrow keys
- **Auto-completion**: Tab completion for available commands
- **Real-time Feedback**: Instant command execution and output
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **Quick Command Buttons**: Click buttons for instant command execution
- **Smart Scrolling**: Optimal positioning when using command buttons vs typing

## 🛠️ Technologies Used

- **React 19** - Modern React with latest features
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn more about me and my background |
| `skills` | View my technical skills and expertise |
| `projects` | Explore my featured projects and work |
| `experience` | Check out my professional experience |
| `education` | View my educational background |
| `achievements` | See my achievements and milestones |
| `research` | Read about my research publications |
| `contact` | Get my contact information |
| `clear` | Clear the terminal screen |
| `whoami` | Display current user information |
| `pwd` | Print working directory |
| `date` | Display current date and time |
| `ls` | List directory contents |
| `cat <file>` | Display file contents |
| `echo <text>` | Display a line of text |
| `history` | Show command history |

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MuzzammiI/Interactive-Terminal-Portfolio.git
cd Interactive-Terminal-Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

This project is configured for easy deployment to GitHub Pages.

1.  **Configure `package.json`**: Make sure the `homepage` field in your `package.json` points to your GitHub Pages URL.
    
    ```json
    "homepage": "https://<your-github-username>.github.io/<your-repo-name>/"
    ```
    
2.  **Deploy**: Run the following command to build and deploy your portfolio:
    
    ```bash
    npm run deploy
    ```
    
    This command will create a `gh-pages` branch and push the contents of the `dist` directory to it. Your portfolio will then be available at the URL specified in the `homepage` field.

## 📁 Project Structure

```
terminal-portfolio/
├── src/
│   ├── components/
│   │   ├── Terminal.jsx          # Main terminal component
│   │   ├── LoadingScreen.jsx     # Loading animation
│   │   └── ErrorBoundary.jsx     # Error handling
│   ├── data/
│   │   └── whoami.json          # Personal data and content
│   ├── assets/
│   │   └── whoiam1.jpg          # Profile image
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/
├── package.json
└── README.md
```

## 🎨 Customization

To customize this portfolio for yourself:

1.  **Update Personal Data**: All the content of the portfolio is sourced from the `src/data/whoami.json` file. Open this file and replace the placeholder data with your own information. The sections include:
    *   `personalInfo`: Your name, title, location, email, and bio.
    *   `strengths`: A list of your personal strengths.
    *   `interests`: Your hobbies and interests.
    *   `skills`: Your technical skills, categorized.
    *   `projects`: Your featured projects, including descriptions, technologies, and links.
    *   `experience`: Your professional experience.
    *   `education`: Your educational background.
    *   `achievements`: Your achievements and milestones.
    *   `research`: Your research publications.
    *   `contact`: Your contact information and social media links.
2.  **Replace Profile Image**: Add your profile picture to the `src/assets/` directory and update the import in `src/components/Terminal.jsx`:
    
    ```javascript
    import whoami from '../assets/your-image.jpg'; 
    ```
    
3.  **Modify Styling**: Customize the colors, fonts, and other design elements in `tailwind.config.js`.
4.  **Add New Commands**: To add new commands, you'll need to:
    *   Add the command and its description to the `commands` object in `src/data/whoami.json`.
    *   Add a corresponding icon to the `commandIcons` object in `src/components/Terminal.jsx`.
    *   Implement the logic for the new command in the `executeCommand` function in `src/components/Terminal.jsx`.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**MD Mozammil**
- Portfolio: [https://MuzzammiI.github.io/Interactive-Terminal-Portfolio/](https://MuzzammiI.github.io/Interactive-Terminal-Portfolio/)
- GitHub: [@MuzzammiI](https://github.com/MuzzammiI)
- Email: mdmozammil112002@gmail.com

## 🙏 Acknowledgments

- Thanks to the React and Vite communities for amazing tools
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling
- Lucide React for beautiful icons

---

⭐ Star this repository if you found it helpful!
