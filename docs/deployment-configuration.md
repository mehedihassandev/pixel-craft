# Deployment Configuration

This document explains how deployments are configured to only happen on the main branch, not on pull requests.

## Configuration Overview

### 1. GitHub Actions Workflows

#### PR Checks Only (`/.github/workflows/prlint.yml`)

- **Triggers**: Pull requests to main branch
- **Actions**:
  - Linting checks
  - Commit message validation
  - Code formatting validation
- **No Build/Deploy**: This workflow only runs checks, no building or deployment

#### Production Deployment (`/.github/workflows/deploy.yml`)

- **Triggers**: Push to main branch only
- **Actions**:
  - Build the application
  - Run tests and type checking
  - Deploy to production (when configured)
- **Safety**: Includes multiple checks to ensure it only runs on main branch

### 2. Vercel Configuration (`vercel.json`)

```json
{
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "github": {
    "deployPullRequests": false,
    "deployCommits": true
  }
}
```

- **`deployPullRequests: false`**: Prevents Vercel from creating preview deployments for PRs
- **`deploymentEnabled.main: true`**: Only enables deployment for the main branch
- **`deployCommits: true`**: Automatically deploys when commits are pushed to main

### 3. Firebase App Hosting Configuration (`apphosting.yaml`)

```yaml
buildConfig:
  source:
    gitRepository:
      gitBranch: main
```

- **`gitBranch: main`**: Specifies that only the main branch should trigger builds

## Deployment Flow

### For Pull Requests

1. ✅ Code quality checks run
2. ✅ Linting and formatting validation
3. ✅ Commit message validation
4. ❌ **No build or deployment happens**

### For Main Branch (after PR merge)

1. ✅ Full build process
2. ✅ Type checking and linting
3. ✅ Production deployment
4. ✅ Live site update

## Platform-Specific Settings

### Vercel Dashboard Settings

In your Vercel project settings:

1. Go to **Settings** → **Git**
2. Ensure **"Deploy Hooks"** is configured for main branch only
3. Under **"Ignored Build Step"**, you can add this command to skip builds for non-main branches:
   ```bash
   if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then exit 0; else exit 1; fi
   ```

### Firebase Console Settings

In your Firebase project:

1. Go to **App Hosting** → **Settings**
2. Ensure the connected repository is set to deploy from `main` branch only
3. Disable automatic deployments for other branches

## Benefits

1. **Faster PR Reviews**: No unnecessary builds during PR process
2. **Resource Efficiency**: Saves build minutes and deployment resources
3. **Cleaner Deployments**: Only tested, merged code gets deployed
4. **Cost Optimization**: Reduces usage of build/deployment quotas
5. **Stable Production**: Prevents accidental deployments from feature branches

## Troubleshooting

### If builds still trigger on PRs:

1. Check Vercel project settings in dashboard
2. Verify `vercel.json` configuration
3. Check Firebase App Hosting branch settings
4. Review GitHub Actions workflow triggers

### If main branch doesn't deploy:

1. Check GitHub Actions logs
2. Verify environment variables are set
3. Check Firebase/Vercel authentication tokens
4. Ensure main branch protection rules allow deployments

## Environment Variables

For production deployment, ensure these secrets are configured in GitHub:

```
FIREBASE_SERVICE_ACCOUNT (for Firebase App Hosting)
VERCEL_TOKEN (for Vercel deployment)
VERCEL_ORG_ID (for Vercel deployment)
VERCEL_PROJECT_ID (for Vercel deployment)
```

## Testing the Configuration

1. Create a new feature branch
2. Open a PR → Should only run checks, no deployment
3. Merge PR to main → Should trigger full build and deployment
