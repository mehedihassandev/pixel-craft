# Pixel Craft 🎨

An open-source NextJS image processing application built with Firebase and modern web technologies. Transform, optimize, and enhance your images with cutting-edge AI-powered tools.

[![GitHub](https://img.shields.io/badge/GitHub-Open%20Source-blue)](https://github.com/mehedihassandev/pixel-craft)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 🌟 Features

-   **AI-Powered Background Removal** - Remove backgrounds with advanced AI
-   **Image Optimization** - Compress and optimize images for web
-   **OCR (Text Recognition)** - Extract text from images
-   **Image Resizing** - Batch resize images with custom dimensions
-   **PNG to SVG Conversion** - Convert raster images to vector format
-   **Placeholder Generation** - Create custom placeholder images
-   **Modern UI** - Built with shadcn/ui and Tailwind CSS
-   **Real-time Processing** - Fast image processing in the browser
-   **No Registration Required** - Use all features without signing up

## 🚀 Quick Start

### Prerequisites

-   Node.js 18 or higher
-   npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/mehedihassandev/pixel-craft.git
    cd pixel-craft
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002) to see the application.

## 🛠️ Tech Stack

-   **Framework**: Next.js 14 with App Router
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **State Management**: React Hooks
-   **AI Integration**: Google Genkit
-   **Image Processing**: Canvas API, ImageMagick
-   **Deployment**: Firebase App Hosting
-   **Code Quality**: ESLint, Prettier, Husky

## 🤝 Contributing

We welcome contributions from the community! This project is open source and we encourage developers of all skill levels to contribute.

### Ways to Contribute

-   🐛 **Report Bugs** - Found a bug? [Open an issue](https://github.com/mehedihassandev/pixel-craft/issues)
-   💡 **Feature Requests** - Have an idea? [Suggest a feature](https://github.com/mehedihassandev/pixel-craft/issues)
-   🔧 **Code Contributions** - Submit pull requests with improvements
-   📚 **Documentation** - Help improve our documentation
-   🌐 **Translations** - Help translate the app to other languages
-   🎨 **Design** - Contribute to UI/UX improvements

### Getting Started with Contributing

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
    ```bash
    git clone https://github.com/mehedihassandev/pixel-craft.git
    ```
3. **Create a feature branch** from `develop`
    ```bash
    git checkout -b feature/your-feature-name develop
    ```
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Commit using our format** (see below)
7. **Push to your fork** and create a pull request

### First Time Contributors

Look for issues labeled with:

-   `good first issue` - Perfect for newcomers
-   `help wanted` - We need community help
-   `beginner friendly` - Great for learning

## Development Workflow

### Commit Message Format

This project uses conventional commit messages to maintain a clean and readable git history. All commit messages must follow this pattern:

```
type(scope): description
```

Where:

-   `type` indicates the kind of change (feat, fix, docs, style, refactor, test, chore)
-   `scope` is optional and indicates the area of the codebase affected
-   `description` should be a brief, imperative description of the change

#### Examples of Valid Commit Messages:

```
feat(resize): add batch image resizing functionality
fix(ocr): resolve text recognition accuracy issues
docs(readme): update installation instructions
style(ui): improve button hover animations
refactor(utils): optimize image processing functions
test(ocr): add unit tests for text extraction
chore(deps): update dependencies to latest versions
```

#### Commit Types:

-   **feat**: A new feature for the user
-   **fix**: A bug fix
-   **docs**: Documentation changes
-   **style**: Code style changes (formatting, missing semi-colons, etc)
-   **refactor**: Code changes that neither fix a bug nor add a feature
-   **test**: Adding or updating tests
-   **chore**: Changes to build process, dependencies, or other maintenance tasks

### Git Hooks

This project uses Husky to enforce code quality:

-   **Pre-commit hook**: Runs ESLint and TypeScript checks before each commit
-   **Commit-msg hook**: Validates commit message format using conventional commits

### Pull Request Checks

All pull requests are automatically checked for:

1. **Commit Message Format**: All commits in the PR must follow conventional commit format
2. **Code Linting**: ESLint must pass without errors
3. **Type Checking**: TypeScript compilation must succeed
4. **Build**: The project must build successfully
5. **Tests**: All tests must pass (when applicable)

### Available Scripts

-   `npm run dev` - Start development server with Turbopack
-   `npm run build` - Build the project for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint
-   `npm run typecheck` - Run TypeScript type checking
-   `npm run genkit:dev` - Start Genkit development server
-   `npm run genkit:watch` - Start Genkit in watch mode

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── models/             # Data models and types
├── navigation/         # Routing and navigation
└── types/              # TypeScript type definitions
```

## 🌍 Community

-   **GitHub Issues** - [Report bugs and request features](https://github.com/mehedihassandev/pixel-craft/issues)
-   **Discussions** - [Join community discussions](https://github.com/mehedihassandev/pixel-craft/discussions)
-   **Discord** - [Join our Discord server](https://discord.gg/your-server) (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   Thanks to all contributors who have helped make this project better
-   Built with amazing open source technologies
-   Special thanks to the Next.js and React communities

## 💖 Support the Project

If you find this project helpful, please consider:

-   ⭐ Starring the repository
-   🐛 Reporting bugs
-   💡 Suggesting new features
-   🤝 Contributing code
-   📢 Sharing with others

---

**Made with ❤️ by the open source community**
