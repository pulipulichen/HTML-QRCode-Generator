---
name: e2e-test-generator
description: Generate Playwright E2E test scripts compatible with the project's Docker-based infrastructure. This skill only creates or updates test-related files; it does not run, verify, or debug tests automatically.
---

# E2E Test Generator Skill

This skill provides instructions for generating Playwright E2E test scripts that are designed to run within the project's Docker-based testing environment.

The goal of this skill is to help create the required Playwright test files and supporting configuration files. It should focus on producing correct, copy-paste-ready files for the user.

## Scope

This skill should:

- Generate Playwright E2E test scripts.
- Create test files under the `e2e/` directory.
- Add or update supporting files such as `.gitignore`, `Dockerfile.test`, `playwright.config.js`, and `package.json`.
- Follow the Docker-based test runner structure described below.

This skill should **not**:

- Run the tests.
- Verify whether the tests pass.
- Execute `npm run start`.
- Inspect the generated Playwright report.
- Debug the test result after execution.

Validation and test execution are handled manually by the user.

## Infrastructure Context

The project uses a Docker-based test runner defined in `docker-compose.yml` and `Dockerfile.test`.

- **Base URL**: `http://localhost:8080` mapped within Docker.
- **Test Command**: `npm run start`, which runs `docker compose up --build`.
- **Test Directory**: `e2e/`.
- **Tech Stack**: Playwright, Node.js, `http-server`.

## Language Requirement (Important)

- **All comments in E2E test files MUST be written in English.**
- This includes inline comments, block comments, TODO/FIXME notes, and example placeholder comments.
- Do not generate comments in Chinese or mixed-language comments for `e2e/*.spec.js`.
- If existing comments are non-English, normalize them to clear English when updating the test file.

## Test Script Template

Create new tests in the `e2e/` directory with the `.spec.js` extension.

```javascript
import { test, expect } from '@playwright/test';

test('describe the test scenario', async ({ page }) => {
  // 1. Navigate to the app
  await page.goto('http://localhost:8080');

  // 2. Setup console error tracking
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 3. Perform actions
  // Example: await page.locator('#button-id').click();

  // 4. Assertions
  // Example: await expect(page.locator('h1')).toBeVisible();

  // 5. Final checks
  await page.waitForLoadState('networkidle');
  expect(consoleErrors).toHaveLength(0);
});
```

## Common Patterns

### Waiting for Elements

Use `waitFor()` or specific Playwright assertions that include automatic waiting:

```javascript
const element = page.locator('#my-element');
await element.waitFor();
await expect(element).toBeVisible({ timeout: 60000 });
```

### Checking List Counts

```javascript
const items = page.locator('#item-list > div');
await expect(items).toHaveCount(3);
```

### Triggering Demo/Internal Actions

The project includes specific buttons for testing, such as `#loadDemoImagesButton`.

Use these internal or demo-only controls to populate data during tests instead of relying on external services, manual uploads, or fragile network dependencies.

## Add files

### Add `/.gitignore`

Add the following to `/.gitignore`:

```gitignore
**/[[]trash
.env
.vscode
node_modules/
playwright-report/
playwright-report-videos/
```

### Add `/Dockerfile.test`

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Install a simple static web server
RUN npm install -g http-server

# Create a separate directory for node_modules to avoid being overwritten by volume mount
WORKDIR /deps
RUN npm init -y && npm install @playwright/test@1.40.0

WORKDIR /app
# Copy project files

# Run tests
# We use the playwright test runner from the /deps/node_modules
CMD ["sh", "-c", "http-server . -p 8080 & sleep 2 && NODE_PATH=/deps/node_modules /deps/node_modules/.bin/playwright test --output=/app/playwright-report-videos"]
```

### Add `/playwright.config.js`

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'playwright-report-videos',
  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    // video: 'retain-on-failure',
    video: 'on',
  },
});
```

### Add `/package.json`

```json
{
  "scripts": {
    "start": "sudo docker compose up --build --exit-code-from test-runner"
  }
}
```

## Workflow

1. **Create Test**: Add a file to `e2e/file-name.spec.js`.
2. **Run Test Manually**: The user executes `npm run start` in the terminal.
3. **Check Result Manually**:
   - If no test fails, the command exits with code `0`.
   - If any test fails, the command exits with code `1`.
4. **Debug Manually**: The user checks the terminal output or examines the `playwright-report-videos/` directory.

The assistant should stop after generating or updating the required files. It should not attempt to run, verify, or debug the tests unless the user explicitly asks for that in a separate request.