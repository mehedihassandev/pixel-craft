# Pixel Craft

This is a NextJS image processing application built with Firebase and modern web technologies.

## Getting Started

To get started, take a look at src/app/page.tsx.

### Prerequisites

-   Node.js 18 or higher
-   npm

### Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```

## Development Workflow

### Commit Message Format

This project uses a strict commit message format enforced by commitlint. All commit messages must follow this pattern:

```
MH(XXX): Your commit message
```

Where:

-   `MH` is the required type prefix
-   `XXX` is a 3-digit numeric scope (e.g., 001, 123, 999)
-   The message should describe what the commit does

#### Examples of Valid Commit Messages:

```
MH(001): Add image resize functionality
MH(123): Fix OCR text recognition bug
MH(456): Update UI components styling
```

#### Examples of Invalid Commit Messages:

```
❌ Add feature
❌ MH: Fix bug (missing scope)
❌ MH(12): Fix bug (scope must be 3 digits)
❌ fix(001): Update code (wrong type)
```

### Git Hooks

This project uses Husky to enforce code quality:

-   **Pre-commit hook**: Runs ESLint and TypeScript checks before each commit
-   **Commit-msg hook**: Validates commit message format using commitlint

### Pull Request Checks

All pull requests are automatically checked for:

1. **Commit Message Format**: All commits in the PR must follow the required format
2. **Code Linting**: ESLint must pass without errors
3. **Type Checking**: TypeScript compilation must succeed
4. **Build**: The project must build successfully
5. **PR Title Format**: Must follow the pattern `NE-\d+:.[A-Z][a-z]+` with at least three words in imperative mood

### Available Scripts

-   `npm run dev` - Start development server with Turbopack
-   `npm run build` - Build the project for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint
-   `npm run typecheck` - Run TypeScript type checking
-   `npm run genkit:dev` - Start Genkit development server
-   `npm run genkit:watch` - Start Genkit in watch mode

## Contributing

1. Create a feature branch from `develop`
2. Make your changes following the coding standards
3. Ensure all tests pass and code is properly formatted
4. Commit using the required message format
5. Create a pull request to `develop` branch

The automated CI/CD pipeline will verify your changes before they can be merged.
