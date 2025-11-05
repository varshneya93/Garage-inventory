/**
 * System Health Check Script
 * Verifies all system components are functioning correctly
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface HealthCheckResult {
  component: string;
  status: 'healthy' | 'unhealthy' | 'warning';
  message: string;
  details?: any;
}

async function checkDatabase(): Promise<HealthCheckResult> {
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    const projectCount = await prisma.project.count();
    const blogCount = await prisma.blogPost.count();
    
    return {
      component: 'Database',
      status: 'healthy',
      message: 'Database connection successful',
      details: {
        users: userCount,
        projects: projectCount,
        blogPosts: blogCount
      }
    };
  } catch (error) {
    return {
      component: 'Database',
      status: 'unhealthy',
      message: `Database connection failed: ${error}`,
    };
  }
}

async function checkDataIntegrity(): Promise<HealthCheckResult> {
  try {
    // Check for orphaned records
    const projectImages = await prisma.projectImage.findMany({
      include: { project: true }
    });
    
    const orphanedImages = projectImages.filter(img => !img.project);
    
    if (orphanedImages.length > 0) {
      return {
        component: 'Data Integrity',
        status: 'warning',
        message: `Found ${orphanedImages.length} orphaned project images`,
        details: { orphanedImages: orphanedImages.length }
      };
    }
    
    return {
      component: 'Data Integrity',
      status: 'healthy',
      message: 'No data integrity issues found'
    };
  } catch (error) {
    return {
      component: 'Data Integrity',
      status: 'unhealthy',
      message: `Data integrity check failed: ${error}`
    };
  }
}

async function checkPublishedContent(): Promise<HealthCheckResult> {
  try {
    const publishedProjects = await prisma.project.count({
      where: { status: 'PUBLISHED' }
    });
    
    const publishedBlogPosts = await prisma.blogPost.count({
      where: { status: 'PUBLISHED' }
    });
    
    if (publishedProjects === 0 && publishedBlogPosts === 0) {
      return {
        component: 'Published Content',
        status: 'warning',
        message: 'No published content found',
        details: {
          publishedProjects: 0,
          publishedBlogPosts: 0
        }
      };
    }
    
    return {
      component: 'Published Content',
      status: 'healthy',
      message: 'Published content available',
      details: {
        publishedProjects,
        publishedBlogPosts
      }
    };
  } catch (error) {
    return {
      component: 'Published Content',
      status: 'unhealthy',
      message: `Content check failed: ${error}`
    };
  }
}

async function checkAdminUsers(): Promise<HealthCheckResult> {
  try {
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });
    
    if (adminCount === 0) {
      return {
        component: 'Admin Users',
        status: 'warning',
        message: 'No admin users found',
        details: { adminCount: 0 }
      };
    }
    
    return {
      component: 'Admin Users',
      status: 'healthy',
      message: `${adminCount} admin user(s) configured`,
      details: { adminCount }
    };
  } catch (error) {
    return {
      component: 'Admin Users',
      status: 'unhealthy',
      message: `Admin user check failed: ${error}`
    };
  }
}

async function checkRecentActivity(): Promise<HealthCheckResult> {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const recentAnalytics = await prisma.analytics.count({
      where: {
        createdAt: { gte: oneDayAgo }
      }
    });
    
    const recentInquiries = await prisma.contactInquiry.count({
      where: {
        createdAt: { gte: oneDayAgo }
      }
    });
    
    return {
      component: 'Recent Activity',
      status: 'healthy',
      message: 'Activity tracking operational',
      details: {
        analyticsEvents24h: recentAnalytics,
        inquiries24h: recentInquiries
      }
    };
  } catch (error) {
    return {
      component: 'Recent Activity',
      status: 'unhealthy',
      message: `Activity check failed: ${error}`
    };
  }
}

async function checkEnvironmentVariables(): Promise<HealthCheckResult> {
  const requiredVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    return {
      component: 'Environment Variables',
      status: 'unhealthy',
      message: `Missing required environment variables: ${missingVars.join(', ')}`
    };
  }
  
  return {
    component: 'Environment Variables',
    status: 'healthy',
    message: 'All required environment variables are set'
  };
}

async function runHealthChecks(): Promise<void> {
  console.log('🏥 Running System Health Checks...\n');
  console.log('='.repeat(60));
  
  const checks = [
    checkEnvironmentVariables(),
    checkDatabase(),
    checkDataIntegrity(),
    checkPublishedContent(),
    checkAdminUsers(),
    checkRecentActivity()
  ];
  
  const results = await Promise.all(checks);
  
  let healthyCount = 0;
  let warningCount = 0;
  let unhealthyCount = 0;
  
  results.forEach(result => {
    const icon = result.status === 'healthy' ? '✅' : 
                 result.status === 'warning' ? '⚠️' : '❌';
    
    console.log(`\n${icon} ${result.component}`);
    console.log(`   Status: ${result.status.toUpperCase()}`);
    console.log(`   ${result.message}`);
    
    if (result.details) {
      console.log(`   Details:`, JSON.stringify(result.details, null, 2));
    }
    
    if (result.status === 'healthy') healthyCount++;
    else if (result.status === 'warning') warningCount++;
    else unhealthyCount++;
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Health Check Summary:');
  console.log(`   ✅ Healthy: ${healthyCount}`);
  console.log(`   ⚠️  Warnings: ${warningCount}`);
  console.log(`   ❌ Unhealthy: ${unhealthyCount}`);
  console.log(`   Total: ${results.length}`);
  
  if (unhealthyCount > 0) {
    console.log('\n❌ System health check FAILED');
    process.exit(1);
  } else if (warningCount > 0) {
    console.log('\n⚠️  System health check completed with warnings');
    process.exit(0);
  } else {
    console.log('\n✅ System health check PASSED');
    process.exit(0);
  }
}

// Run health checks
runHealthChecks()
  .catch(error => {
    console.error('❌ Health check failed with error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
