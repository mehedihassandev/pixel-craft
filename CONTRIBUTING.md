# Contributing to Pixel Craft

Thank you for contributing to Pixel Craft! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork:
    ```bash
    git clone https://github.com/yourusername/pixel-craft.git
    cd pixel-craft
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a feature branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```

## Code Standards

### Commit Message Format

**IMPORTANT**: All commits must follow the exact format below or they will be rejected:

```
MH(XXX): Your commit message
```

**Rules:**

-   Type must be exactly `MH`
-   Scope must be exactly 3 digits (000-999)
-   Use parentheses around the scope: `(XXX)`
-   Follow with a colon and space: `: `
-   Use imperative mood (e.g., "Add", "Fix", "Update", not "Added", "Fixed", "Updated")

**Valid Examples:**

```
MH(001): Add image resize functionality
MH(123): Fix OCR text recognition error
MH(456): Update background removal algorithm
MH(789): Remove deprecated API calls
```

**Invalid Examples:**

```
❌ Add new feature
❌ MH: Fix bug (missing scope)
❌ MH(12): Fix bug (scope not 3 digits)
❌ MH(1234): Fix bug (scope too long)
❌ fix(001): Update code (wrong type)
❌ MH(001) Fix bug (missing colon)
❌ MH(001):Fix bug (missing space after colon)
```

### Code Quality

The project uses automated tools to ensure code quality:

-   **ESLint**: Enforces JavaScript/TypeScript coding standards
-   **TypeScript**: Provides type safety
-   **Prettier**: Code formatting (if configured)

These checks run automatically:

-   Before each commit (pre-commit hook)
-   On pull request creation/updates (CI pipeline)

### Pre-commit Hooks

Husky is configured to run the following checks before each commit:

-   `npm run lint` - ESLint checks
-   `npm run typecheck` - TypeScript compilation
-   `commitlint` - Commit message format validation

If any check fails, the commit will be rejected. Fix the issues and try again.

## Pull Request Process

### PR Requirements

1. **Branch**: Create PRs against the `develop` branch
2. **Title Format**: Must match `NE-\d+:.[A-Z][a-z]+` pattern
    - Example: `NE-123: Add image optimization feature`
3. **Description**: Provide clear description of changes
4. **Commits**: All commits must follow the commit message format
5. **Tests**: Ensure all existing tests pass
6. **Documentation**: Update documentation if needed

### Automated Checks

Every PR triggers automated checks:

1. **Commit Message Validation**: All commits checked against format rules
2. **Code Linting**: ESLint must pass
3. **Type Checking**: TypeScript compilation must succeed
4. **Build Test**: Project must build successfully
5. **PR Title Validation**: Title must follow required format

### PR Title Rules

-   Must start with `NE-` followed by digits and colon
-   Must have at least 3 words
-   Must use imperative mood (not past tense or gerund)

**Valid PR Titles:**

```
NE-123: Add image resize functionality
NE-456: Fix OCR text recognition
NE-789: Update background removal algorithm
```

**Invalid PR Titles:**

```
❌ Add feature (missing NE- prefix)
❌ NE-123: Add (too few words)
❌ NE-123: Adding feature (gerund form)
❌ NE-123: Added feature (past tense)
```

## Scope Number Guidelines

Use these scope ranges for different types of changes:

-   **000-099**: Infrastructure, build, configuration
-   **100-199**: Core functionality, major features
-   **200-299**: UI/UX improvements
-   **300-399**: Bug fixes
-   **400-499**: Performance optimizations
-   **500-599**: Documentation
-   **600-699**: Tests
-   **700-799**: Refactoring
-   **800-899**: Dependencies, external integrations
-   **900-999**: Miscellaneous/experimental

## Getting Help

-   Check existing issues before creating new ones
-   Use descriptive titles and detailed descriptions
-   Include steps to reproduce for bug reports
-   Add relevant labels and assignees

## Code of Conduct

-   Be respectful and inclusive
-   Focus on constructive feedback
-   Help others learn and grow
-   Follow the project's technical standards

## Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Address feedback promptly
4. Merge only after approval

Thank you for contributing to Pixel Craft!
