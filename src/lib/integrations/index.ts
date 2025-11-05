/**
 * Central integration utilities for external services
 * This file provides a unified interface for all external service integrations
 */

import { createGitHubIntegration } from './github';
import { createSocialMediaIntegration } from './social-media';
import { createAnalyticsIntegration } from './analytics';

export * from './github';
export * from './social-media';
export * from './analytics';

/**
 * Integration status checker
 * Returns which integrations are properly configured
 */
export function getIntegrationStatus() {
  return {
    github: {
      enabled: !!process.env.GITHUB_USERNAME,
      configured: !!(process.env.GITHUB_USERNAME && process.env.GITHUB_TOKEN),
    },
    analytics: {
      googleAnalytics: !!process.env.NEXT_PUBLIC_GA_ID,
      plausible: !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
      mixpanel: !!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    },
    email: {
      resend: !!process.env.RESEND_API_KEY,
      sendgrid: !!process.env.SENDGRID_API_KEY,
      smtp: !!process.env.EMAIL_SERVER_HOST,
      configured: !!(
        process.env.RESEND_API_KEY ||
        process.env.SENDGRID_API_KEY ||
        process.env.EMAIL_SERVER_HOST
      ),
    },
    emailMarketing: {
      mailchimp: !!(process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID),
      convertkit: !!(process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID),
      configured: !!(
        (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) ||
        (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID)
      ),
    },
    social: {
      twitter: !!process.env.TWITTER_USERNAME,
      linkedin: !!process.env.LINKEDIN_PROFILE,
      instagram: !!process.env.INSTAGRAM_USERNAME,
    },
  };
}

/**
 * Initialize all configured integrations
 * Returns instances of all available integrations
 */
export function initializeIntegrations() {
  const status = getIntegrationStatus();
  
  return {
    github: status.github.enabled ? createGitHubIntegration() : null,
    social: createSocialMediaIntegration(),
    analytics: createAnalyticsIntegration(),
    status,
  };
}

/**
 * Validate integration configuration
 * Useful for admin dashboard to show which integrations need setup
 */
export function validateIntegrationConfig() {
  const status = getIntegrationStatus();
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check GitHub
  if (status.github.enabled && !status.github.configured) {
    warnings.push('GitHub username is set but no access token provided. API rate limits will be lower.');
  }

  // Check Analytics
  const analyticsCount = [
    status.analytics.googleAnalytics,
    status.analytics.plausible,
    status.analytics.mixpanel,
  ].filter(Boolean).length;

  if (analyticsCount === 0) {
    warnings.push('No analytics service configured. Consider adding Google Analytics or Plausible.');
  }

  // Check Email
  if (!status.email.configured) {
    errors.push('No email service configured. Contact form notifications will not be sent.');
  }

  // Check Email Marketing
  if (!status.emailMarketing.configured) {
    warnings.push('No email marketing service configured. Newsletter subscriptions will not be synced.');
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
    status,
  };
}

/**
 * Test integration connectivity
 * Useful for admin dashboard to verify integrations are working
 */
export async function testIntegrations() {
  const results: Record<string, { success: boolean; message: string }> = {};

  // Test GitHub
  try {
    const github = createGitHubIntegration();
    if (github) {
      const profile = await github.getUserProfile();
      results.github = {
        success: !!profile,
        message: profile ? `Connected as ${profile.login}` : 'Failed to fetch profile',
      };
    } else {
      results.github = {
        success: false,
        message: 'GitHub not configured',
      };
    }
  } catch (error) {
    results.github = {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Test Social Media
  try {
    const social = createSocialMediaIntegration();
    const links = social.getSocialLinks();
    results.social = {
      success: links.length > 0,
      message: `${links.length} social link(s) configured`,
    };
  } catch (error) {
    results.social = {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Analytics is client-side only, so we just check configuration
  const status = getIntegrationStatus();
  const analyticsServices: string[] = [];
  if (status.analytics.googleAnalytics) analyticsServices.push('Google Analytics');
  if (status.analytics.plausible) analyticsServices.push('Plausible');
  if (status.analytics.mixpanel) analyticsServices.push('Mixpanel');

  results.analytics = {
    success: analyticsServices.length > 0,
    message: analyticsServices.length > 0
      ? `Configured: ${analyticsServices.join(', ')}`
      : 'No analytics services configured',
  };

  // Email configuration check
  results.email = {
    success: status.email.configured,
    message: status.email.configured
      ? 'Email service configured'
      : 'No email service configured',
  };

  return results;
}
