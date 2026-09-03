/**
 * check-style.js
 * Automated UI & Design System Style Linter.
 *
 * Enforces STYLE_GUIDE.md standards:
 * 1. Buttons must strictly use .btn-primary, .btn-secondary, or .touch-btn classes.
 * 2. No inline styles (style="..." or .style.* direct assignments).
 * 3. No arbitrary hardcoded hex codes in style.css outside :root.
 * 4. Checks both project root files and .agents/skills/ resources templates.
 */

import fs from 'node:fs';
import path from 'node:path';

const ALLOWED_BUTTON_CLASSES = ['btn-primary', 'btn-secondary', 'touch-btn', 'touch-action-btn'];

let errorCount = 0;
let warningCount = 0;

function reportError(file, line, msg) {
  console.error(`❌ [STYLE ERROR] ${file}:${line} -> ${msg}`);
  errorCount++;
}

function reportWarning(file, line, msg) {
  console.warn(`⚠️  [STYLE WARN]  ${file}:${line} -> ${msg}`);
  warningCount++;
}

/**
 * Validates HTML files for unstyled buttons and inline styles
 */
function checkHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;

    // Check for button elements
    const buttonMatch = lineText.match(/<button\b([^>]*)>/gi);
    if (buttonMatch) {
      buttonMatch.forEach((btnTag) => {
        const classMatch = btnTag.match(/class=["']([^"']*)["']/i);
        if (!classMatch) {
          reportError(filePath, lineNum, `Button has NO class! Must use one of: ${ALLOWED_BUTTON_CLASSES.join(', ')}`);
        } else {
          const classes = classMatch[1].split(/\s+/);
          const hasValidClass = classes.some((c) => ALLOWED_BUTTON_CLASSES.includes(c));
          if (!hasValidClass) {
            reportError(
              filePath,
              lineNum,
              `Button uses ad-hoc class "${classMatch[1]}". Must include one of: ${ALLOWED_BUTTON_CLASSES.join(', ')}`
            );
          }
        }
      });
    }

    // Check for inline style attributes
    if (/<[^>]+style=["'][^"']+["']/i.test(lineText)) {
      reportWarning(filePath, lineNum, 'Inline style detected. Move styling to style.css using CSS classes.');
    }
  });
}

/**
 * Validates CSS files for hardcoded hex colors outside of :root
 */
function checkCssFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let inRoot = false;

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    const trimmed = lineText.trim();

    if (trimmed.startsWith(':root')) {
      inRoot = true;
    }
    if (inRoot && trimmed.includes('}')) {
      inRoot = false;
    }

    // Ignore root block token definitions and comments
    if (!inRoot && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
      // Find hex codes like #ffffff or #123
      const hexMatches = trimmed.match(/#[0-9a-fA-F]{3,8}\b/g);
      if (hexMatches) {
        // Allow pure black or white resets if reasonable, but flag arbitrary hexes
        hexMatches.forEach((hex) => {
          if (hex !== '#000' && hex !== '#000000' && hex !== '#fff' && hex !== '#ffffff') {
            reportWarning(
              filePath,
              lineNum,
              `Hardcoded hex color "${hex}" found outside :root. Reference CSS variables (e.g. var(--primary)) instead.`
            );
          }
        });
      }
    }
  });
}

/**
 * Validates JS files for dynamic unstyled button creation or direct style mutations
 */
function checkJsFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;

    // Check for createElement('button') without classes
    if (/createElement\(['"]button['"]\)/i.test(lineText)) {
      reportWarning(
        filePath,
        lineNum,
        `Dynamically creating button element. Ensure you add one of: ${ALLOWED_BUTTON_CLASSES.join(', ')}`
      );
    }

    // Direct background/color mutations on elements
    if (/\.style\.(backgroundColor|background|color)\s*=\s*['"]#[0-9a-fA-F]+/i.test(lineText)) {
      reportWarning(
        filePath,
        lineNum,
        'Direct inline style mutation with hardcoded color. Use CSS classes or CSS variables.'
      );
    }
  });
}

function scanDirectory(dir, extFilter, callback) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist' && entry.name !== 'scripts') {
      scanDirectory(fullPath, extFilter, callback);
    } else if (entry.isFile() && extFilter.test(entry.name)) {
      callback(fullPath);
    }
  }
}

console.log('🎨 Running UI & Style Drift Linter against STYLE_GUIDE.md...\n');

// 1. Check HTML files
scanDirectory('.', /\.html$/i, checkHtmlFile);

// 2. Check CSS files
scanDirectory('.', /\.css$/i, checkCssFile);

// 3. Check JS files
scanDirectory('.', /\.js$/i, checkJsFile);

console.log('\n----------------------------------------');
if (errorCount === 0 && warningCount === 0) {
  console.log('✅ 100% STYLE GUIDE COMPLIANT! Zero style drift detected.');
  process.exit(0);
} else if (errorCount === 0) {
  console.log(`✨ STYLE PASSED with ${warningCount} advisory warning(s).`);
  process.exit(0);
} else {
  console.error(`🚨 STYLE DRIFT DETECTED: ${errorCount} error(s), ${warningCount} warning(s).`);
  process.exit(1);
}
