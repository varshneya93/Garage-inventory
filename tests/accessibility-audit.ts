/**
 * Accessibility Audit Script
 * Checks for common accessibility issues and WCAG 2.1 compliance
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

interface AccessibilityIssue {
  file: string;
  line: number;
  severity: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
}

class AccessibilityAuditor {
  private issues: AccessibilityIssue[] = [];
  private filesScanned = 0;

  private readonly rules = {
    imgAlt: {
      pattern: /<img(?![^>]*alt=)/gi,
      message: 'Image missing alt attribute',
      severity: 'error' as const
    },
    buttonType: {
      pattern: /<button(?![^>]*type=)/gi,
      message: 'Button missing type attribute',
      severity: 'warning' as const
    },
    inputLabel: {
      pattern: /<input(?![^>]*aria-label)(?![^>]*id=)/gi,
      message: 'Input may be missing associated label',
      severity: 'warning' as const
    },
    headingOrder: {
      pattern: /<h[1-6]/gi,
      message: 'Check heading hierarchy',
      severity: 'info' as const
    },
    colorContrast: {
      pattern: /color:\s*#[0-9a-f]{3,6}/gi,
      message: 'Verify color contrast ratio meets WCAG AA standards',
      severity: 'info' as const
    },
    ariaRoles: {
      pattern: /role="(?!button|link|navigation|main|complementary|banner|contentinfo|search|form|region|article|list|listitem|heading|img|dialog|alertdialog|alert|status|log|marquee|timer|tablist|tab|tabpanel|menu|menubar|menuitem|menuitemcheckbox|menuitemradio|tree|treeitem|group|toolbar|tooltip|feed|figure|separator|none|presentation)"/gi,
      message: 'Invalid or non-standard ARIA role',
      severity: 'warning' as const
    },
    focusVisible: {
      pattern: /outline:\s*(none|0)/gi,
      message: 'Focus outline removed - ensure alternative focus indicator exists',
      severity: 'error' as const
    },
    semanticHTML: {
      pattern: /<div(?=[^>]*onClick)/gi,
      message: 'Consider using semantic button or link instead of clickable div',
      severity: 'warning' as const
    }
  };

  scanFile(filePath: string): void {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      Object.entries(this.rules).forEach(([ruleName, rule]) => {
        lines.forEach((line, index) => {
          if (rule.pattern.test(line)) {
            this.issues.push({
              file: filePath,
              line: index + 1,
              severity: rule.severity,
              rule: ruleName,
              message: rule.message
            });
          }
        });
      });

      this.filesScanned++;
    } catch (error) {
      console.error(`Error scanning ${filePath}:`, error);
    }
  }

  scanDirectory(dir: string, extensions: string[] = ['.tsx', '.jsx', '.ts', '.js']): void {
    try {
      const files = readdirSync(dir);

      files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
          // Skip node_modules and .next directories
          if (!file.startsWith('.') && file !== 'node_modules') {
            this.scanDirectory(filePath, extensions);
          }
        } else if (extensions.includes(extname(file))) {
          this.scanFile(filePath);
        }
      });
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }

  checkKeyboardNavigation(): void {
    console.log('\n⌨️  Keyboard Navigation Checklist:\n');

    const checks = [
      '✓ All interactive elements are keyboard accessible',
      '✓ Tab order is logical and follows visual flow',
      '✓ Focus indicators are visible on all interactive elements',
      '✓ Skip navigation links are provided',
      '✓ Modal dialogs trap focus appropriately',
      '✓ Dropdown menus are keyboard navigable',
      '✓ Custom components support keyboard interaction',
      '✓ No keyboard traps exist'
    ];

    checks.forEach(check => console.log(`   ${check}`));
    console.log('\n   ⚠️  Manual testing required for keyboard navigation');
  }

  checkScreenReaderSupport(): void {
    console.log('\n🔊 Screen Reader Support Checklist:\n');

    const checks = [
      '✓ All images have descriptive alt text',
      '✓ Form inputs have associated labels',
      '✓ ARIA labels are used where appropriate',
      '✓ ARIA live regions for dynamic content',
      '✓ Semantic HTML elements are used',
      '✓ Page title is descriptive',
      '✓ Landmark regions are properly defined',
      '✓ Link text is descriptive (avoid "click here")'
    ];

    checks.forEach(check => console.log(`   ${check}`));
    console.log('\n   ⚠️  Manual testing with screen reader recommended');
  }

  checkColorContrast(): void {
    console.log('\n🎨 Color Contrast Guidelines:\n');

    console.log('   WCAG AA Requirements:');
    console.log('   • Normal text: 4.5:1 contrast ratio');
    console.log('   • Large text (18pt+): 3:1 contrast ratio');
    console.log('   • UI components: 3:1 contrast ratio');
    console.log('\n   WCAG AAA Requirements:');
    console.log('   • Normal text: 7:1 contrast ratio');
    console.log('   • Large text: 4.5:1 contrast ratio');
    console.log('\n   ⚠️  Use browser DevTools or online tools to verify contrast ratios');
  }

  checkResponsiveDesign(): void {
    console.log('\n📱 Responsive Design Checklist:\n');

    const checks = [
      '✓ Content is readable without horizontal scrolling',
      '✓ Touch targets are at least 44x44 pixels',
      '✓ Text can be resized up to 200% without loss of functionality',
      '✓ Content reflows for different viewport sizes',
      '✓ No content is hidden at different zoom levels',
      '✓ Orientation (portrait/landscape) is supported'
    ];

    checks.forEach(check => console.log(`   ${check}`));
  }

  generateReport(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Accessibility Audit Summary');
    console.log('='.repeat(60));

    const errors = this.issues.filter(i => i.severity === 'error');
    const warnings = this.issues.filter(i => i.severity === 'warning');
    const info = this.issues.filter(i => i.severity === 'info');

    console.log(`\n📁 Files Scanned: ${this.filesScanned}`);
    console.log(`❌ Errors: ${errors.length}`);
    console.log(`⚠️  Warnings: ${warnings.length}`);
    console.log(`ℹ️  Info: ${info.length}`);
    console.log(`📋 Total Issues: ${this.issues.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Critical Accessibility Errors:\n');
      errors.slice(0, 10).forEach(issue => {
        console.log(`   ${issue.file}:${issue.line}`);
        console.log(`   Rule: ${issue.rule}`);
        console.log(`   ${issue.message}\n`);
      });
      if (errors.length > 10) {
        console.log(`   ... and ${errors.length - 10} more errors\n`);
      }
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  Accessibility Warnings:\n');
      warnings.slice(0, 5).forEach(issue => {
        console.log(`   ${issue.file}:${issue.line}`);
        console.log(`   Rule: ${issue.rule}`);
        console.log(`   ${issue.message}\n`);
      });
      if (warnings.length > 5) {
        console.log(`   ... and ${warnings.length - 5} more warnings\n`);
      }
    }

    // Calculate compliance score
    const totalChecks = this.filesScanned * 5; // Approximate checks per file
    const issueWeight = errors.length * 3 + warnings.length * 1;
    const score = Math.max(0, 100 - (issueWeight / totalChecks * 100));

    console.log(`\n🎯 Accessibility Score: ${Math.round(score)}%`);

    if (score >= 90) {
      console.log('✅ Excellent accessibility!');
    } else if (score >= 70) {
      console.log('⚠️  Good accessibility, but improvements needed');
    } else {
      console.log('❌ Significant accessibility issues found');
    }
  }

  generateRecommendations(): void {
    console.log('\n💡 Accessibility Recommendations:\n');

    const recommendations = [
      '1. Add alt text to all images (decorative images should have alt="")',
      '2. Ensure all form inputs have associated labels',
      '3. Use semantic HTML elements (header, nav, main, footer, etc.)',
      '4. Provide skip navigation links for keyboard users',
      '5. Ensure sufficient color contrast (WCAG AA minimum)',
      '6. Make all interactive elements keyboard accessible',
      '7. Add ARIA labels where semantic HTML is insufficient',
      '8. Test with actual screen readers (NVDA, JAWS, VoiceOver)',
      '9. Ensure focus indicators are visible',
      '10. Provide text alternatives for non-text content',
      '11. Make sure content is responsive and mobile-friendly',
      '12. Test keyboard navigation thoroughly',
      '13. Use proper heading hierarchy (h1 -> h2 -> h3)',
      '14. Ensure error messages are accessible',
      '15. Provide clear and consistent navigation'
    ];

    recommendations.forEach(rec => console.log(`   ${rec}`));
  }

  async run(): Promise<void> {
    console.log('♿ Starting Accessibility Audit...\n');
    console.log('='.repeat(60));

    // Scan source files
    console.log('\n🔍 Scanning source files for accessibility issues...\n');
    this.scanDirectory(join(process.cwd(), 'src'));

    this.generateReport();
    this.checkKeyboardNavigation();
    this.checkScreenReaderSupport();
    this.checkColorContrast();
    this.checkResponsiveDesign();
    this.generateRecommendations();

    console.log('\n' + '='.repeat(60));
    console.log('✅ Accessibility audit complete!\n');

    if (this.issues.filter(i => i.severity === 'error').length > 0) {
      console.log('⚠️  Critical accessibility issues found. Please address them.\n');
    }
  }
}

// Run the audit
const auditor = new AccessibilityAuditor();
auditor.run().catch(error => {
  console.error('❌ Accessibility audit failed:', error);
  process.exit(1);
});
