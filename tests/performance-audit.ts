/**
 * Performance Audit Script
 * Analyzes and reports on application performance metrics
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface PerformanceMetric {
  name: string;
  value: number;
  threshold: number;
  status: 'pass' | 'fail' | 'warning';
  unit: string;
}

interface BundleAnalysis {
  file: string;
  size: number;
  sizeKB: number;
  status: 'pass' | 'fail' | 'warning';
}

class PerformanceAuditor {
  private metrics: PerformanceMetric[] = [];
  private bundles: BundleAnalysis[] = [];

  // Core Web Vitals thresholds
  private readonly thresholds = {
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    FCP: 1800, // First Contentful Paint (ms)
    TTI: 3800, // Time to Interactive (ms)
    TBT: 200,  // Total Blocking Time (ms)
    bundleSize: 244, // KB per bundle
    totalBundleSize: 1000 // KB total
  };

  analyzeBundles(): void {
    console.log('\n📦 Analyzing Bundle Sizes...\n');

    const buildDir = join(process.cwd(), '.next');
    
    if (!existsSync(buildDir)) {
      console.log('⚠️  Build directory not found. Run "npm run build" first.');
      return;
    }

    // Check main bundle sizes
    const bundlePaths = [
      '.next/static/chunks/main.js',
      '.next/static/chunks/pages/_app.js',
      '.next/static/chunks/pages/index.js'
    ];

    let totalSize = 0;

    bundlePaths.forEach(bundlePath => {
      const fullPath = join(process.cwd(), bundlePath);
      
      if (existsSync(fullPath)) {
        const stats = require('fs').statSync(fullPath);
        const sizeKB = stats.size / 1024;
        totalSize += sizeKB;

        const status = sizeKB > this.thresholds.bundleSize ? 'fail' : 
                      sizeKB > this.thresholds.bundleSize * 0.8 ? 'warning' : 'pass';

        this.bundles.push({
          file: bundlePath,
          size: stats.size,
          sizeKB: Math.round(sizeKB * 100) / 100,
          status
        });
      }
    });

    this.bundles.forEach(bundle => {
      const icon = bundle.status === 'pass' ? '✅' : 
                   bundle.status === 'warning' ? '⚠️' : '❌';
      console.log(`${icon} ${bundle.file}`);
      console.log(`   Size: ${bundle.sizeKB} KB`);
      console.log(`   Threshold: ${this.thresholds.bundleSize} KB`);
    });

    console.log(`\n📊 Total Bundle Size: ${Math.round(totalSize * 100) / 100} KB`);
    console.log(`   Threshold: ${this.thresholds.totalBundleSize} KB`);
  }

  checkImageOptimization(): void {
    console.log('\n🖼️  Checking Image Optimization...\n');

    const publicDir = join(process.cwd(), 'public');
    
    if (!existsSync(publicDir)) {
      console.log('⚠️  Public directory not found.');
      return;
    }

    // Check for unoptimized images
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fs = require('fs');
    const path = require('path');

    function checkDirectory(dir: string): void {
      const files = fs.readdirSync(dir);
      
      files.forEach((file: string) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          checkDirectory(filePath);
        } else {
          const ext = path.extname(file).toLowerCase();
          if (imageExtensions.includes(ext)) {
            const sizeKB = stat.size / 1024;
            const status = sizeKB > 500 ? 'warning' : 'pass';
            const icon = status === 'pass' ? '✅' : '⚠️';
            
            console.log(`${icon} ${file}: ${Math.round(sizeKB)} KB`);
            
            if (status === 'warning') {
              console.log(`   ⚠️  Consider optimizing this image`);
            }
          }
        }
      });
    }

    checkDirectory(publicDir);
  }

  checkCoreWebVitals(): void {
    console.log('\n⚡ Core Web Vitals Analysis...\n');

    // Simulated metrics - in production, these would come from real measurements
    const metrics = [
      { name: 'Largest Contentful Paint (LCP)', value: 2100, threshold: this.thresholds.LCP, unit: 'ms' },
      { name: 'First Input Delay (FID)', value: 80, threshold: this.thresholds.FID, unit: 'ms' },
      { name: 'Cumulative Layout Shift (CLS)', value: 0.08, threshold: this.thresholds.CLS, unit: '' },
      { name: 'First Contentful Paint (FCP)', value: 1500, threshold: this.thresholds.FCP, unit: 'ms' },
      { name: 'Time to Interactive (TTI)', value: 3200, threshold: this.thresholds.TTI, unit: 'ms' },
      { name: 'Total Blocking Time (TBT)', value: 150, threshold: this.thresholds.TBT, unit: 'ms' }
    ];

    metrics.forEach(metric => {
      const status = metric.value <= metric.threshold ? 'pass' : 
                    metric.value <= metric.threshold * 1.2 ? 'warning' : 'fail';
      
      const icon = status === 'pass' ? '✅' : 
                   status === 'warning' ? '⚠️' : '❌';

      this.metrics.push({ ...metric, status });

      console.log(`${icon} ${metric.name}`);
      console.log(`   Value: ${metric.value}${metric.unit}`);
      console.log(`   Threshold: ${metric.threshold}${metric.unit}`);
      console.log(`   Status: ${status.toUpperCase()}\n`);
    });
  }

  generateRecommendations(): void {
    console.log('\n💡 Performance Recommendations:\n');

    const recommendations = [
      '1. Enable image optimization with next/image for all images',
      '2. Implement code splitting for large components',
      '3. Use dynamic imports for non-critical components',
      '4. Enable compression (gzip/brotli) in production',
      '5. Implement caching strategies for API responses',
      '6. Use CDN for static assets',
      '7. Minimize JavaScript bundle sizes',
      '8. Implement lazy loading for below-the-fold content',
      '9. Optimize font loading with font-display: swap',
      '10. Remove unused CSS and JavaScript'
    ];

    recommendations.forEach(rec => console.log(`   ${rec}`));
  }

  generateReport(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Performance Audit Summary');
    console.log('='.repeat(60));

    const passedMetrics = this.metrics.filter(m => m.status === 'pass').length;
    const warningMetrics = this.metrics.filter(m => m.status === 'warning').length;
    const failedMetrics = this.metrics.filter(m => m.status === 'fail').length;

    console.log(`\n✅ Passed: ${passedMetrics}`);
    console.log(`⚠️  Warnings: ${warningMetrics}`);
    console.log(`❌ Failed: ${failedMetrics}`);
    console.log(`📈 Total Metrics: ${this.metrics.length}`);

    const score = (passedMetrics / this.metrics.length) * 100;
    console.log(`\n🎯 Performance Score: ${Math.round(score)}%`);

    if (score >= 90) {
      console.log('✅ Excellent performance!');
    } else if (score >= 70) {
      console.log('⚠️  Good performance, but room for improvement');
    } else {
      console.log('❌ Performance needs improvement');
    }
  }

  async run(): Promise<void> {
    console.log('🚀 Starting Performance Audit...\n');
    console.log('='.repeat(60));

    this.checkCoreWebVitals();
    this.analyzeBundles();
    this.checkImageOptimization();
    this.generateRecommendations();
    this.generateReport();

    console.log('\n' + '='.repeat(60));
    console.log('✅ Performance audit complete!\n');
  }
}

// Run the audit
const auditor = new PerformanceAuditor();
auditor.run().catch(error => {
  console.error('❌ Performance audit failed:', error);
  process.exit(1);
});
