'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Github, 
  Mail, 
  BarChart3, 
  Share2,
  Loader2
} from 'lucide-react';

interface IntegrationStatus {
  github: {
    enabled: boolean;
    configured: boolean;
  };
  analytics: {
    googleAnalytics: boolean;
    plausible: boolean;
    mixpanel: boolean;
  };
  email: {
    resend: boolean;
    sendgrid: boolean;
    smtp: boolean;
    configured: boolean;
  };
  emailMarketing: {
    mailchimp: boolean;
    convertkit: boolean;
    configured: boolean;
  };
  social: {
    twitter: boolean;
    linkedin: boolean;
    instagram: boolean;
  };
}

interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
  status: IntegrationStatus;
}

interface TestResults {
  [key: string]: {
    success: boolean;
    message: string;
  };
}

export function IntegrationManager() {
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetchStatus();
    fetchValidation();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/integrations/status?action=status');
      const data = await response.json();
      if (data.success) {
        setStatus(data.data);
      }
    } catch (error) {
      console.error('Error fetching integration status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchValidation = async () => {
    try {
      const response = await fetch('/api/integrations/status?action=validate');
      const data = await response.json();
      if (data.success) {
        setValidation(data.data);
      }
    } catch (error) {
      console.error('Error fetching validation:', error);
    }
  };

  const runTests = async () => {
    setTesting(true);
    try {
      const response = await fetch('/api/integrations/status?action=test');
      const data = await response.json();
      if (data.success) {
        setTestResults(data.data);
      }
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">External Integrations</h2>
          <p className="text-muted-foreground">
            Manage and monitor external service integrations
          </p>
        </div>
        <Button onClick={runTests} disabled={testing}>
          {testing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Test Connections
            </>
          )}
        </Button>
      </div>

      {validation && (
        <>
          {validation.errors.length > 0 && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Configuration Errors</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {validation.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {validation.warnings.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Configuration Warnings</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {validation.warnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <IntegrationCard
              title="GitHub"
              icon={<Github className="h-5 w-5" />}
              status={status?.github.configured ? 'configured' : status?.github.enabled ? 'partial' : 'disabled'}
              testResult={testResults?.github}
            />
            <IntegrationCard
              title="Analytics"
              icon={<BarChart3 className="h-5 w-5" />}
              status={
                status?.analytics.googleAnalytics || status?.analytics.plausible || status?.analytics.mixpanel
                  ? 'configured'
                  : 'disabled'
              }
              testResult={testResults?.analytics}
            />
            <IntegrationCard
              title="Email"
              icon={<Mail className="h-5 w-5" />}
              status={status?.email.configured ? 'configured' : 'disabled'}
              testResult={testResults?.email}
            />
            <IntegrationCard
              title="Social Media"
              icon={<Share2 className="h-5 w-5" />}
              status={
                status?.social.twitter || status?.social.linkedin || status?.social.instagram
                  ? 'configured'
                  : 'disabled'
              }
              testResult={testResults?.social}
            />
          </div>
        </TabsContent>

        <TabsContent value="github" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub Integration
              </CardTitle>
              <CardDescription>
                Display your GitHub repositories and contribution activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Username Configured</span>
                  <StatusBadge enabled={status?.github.enabled || false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Access Token Configured</span>
                  <StatusBadge enabled={status?.github.configured || false} />
                </div>
              </div>
              {testResults?.github && (
                <Alert variant={testResults.github.success ? 'default' : 'destructive'}>
                  <AlertDescription>{testResults.github.message}</AlertDescription>
                </Alert>
              )}
              <div className="text-sm text-muted-foreground">
                <p>Environment variables:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>GITHUB_USERNAME (required)</li>
                  <li>GITHUB_TOKEN (optional, increases rate limits)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Integration
              </CardTitle>
              <CardDescription>
                Track visitor behavior and portfolio performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Google Analytics</span>
                  <StatusBadge enabled={status?.analytics.googleAnalytics || false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Plausible</span>
                  <StatusBadge enabled={status?.analytics.plausible || false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mixpanel</span>
                  <StatusBadge enabled={status?.analytics.mixpanel || false} />
                </div>
              </div>
              {testResults?.analytics && (
                <Alert variant={testResults.analytics.success ? 'default' : 'destructive'}>
                  <AlertDescription>{testResults.analytics.message}</AlertDescription>
                </Alert>
              )}
              <div className="text-sm text-muted-foreground">
                <p>Environment variables:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>NEXT_PUBLIC_GA_ID (Google Analytics)</li>
                  <li>NEXT_PUBLIC_PLAUSIBLE_DOMAIN (Plausible)</li>
                  <li>NEXT_PUBLIC_MIXPANEL_TOKEN (Mixpanel)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Integration
              </CardTitle>
              <CardDescription>
                Send notifications and manage mailing lists
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Email Service</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Resend</span>
                      <StatusBadge enabled={status?.email.resend || false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SendGrid</span>
                      <StatusBadge enabled={status?.email.sendgrid || false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SMTP</span>
                      <StatusBadge enabled={status?.email.smtp || false} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Email Marketing</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mailchimp</span>
                      <StatusBadge enabled={status?.emailMarketing.mailchimp || false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ConvertKit</span>
                      <StatusBadge enabled={status?.emailMarketing.convertkit || false} />
                    </div>
                  </div>
                </div>
              </div>
              {testResults?.email && (
                <Alert variant={testResults.email.success ? 'default' : 'destructive'}>
                  <AlertDescription>{testResults.email.message}</AlertDescription>
                </Alert>
              )}
              <div className="text-sm text-muted-foreground">
                <p>Environment variables:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>RESEND_API_KEY or SENDGRID_API_KEY (required)</li>
                  <li>ADMIN_EMAIL (required)</li>
                  <li>MAILCHIMP_API_KEY & MAILCHIMP_LIST_ID (optional)</li>
                  <li>CONVERTKIT_API_KEY & CONVERTKIT_FORM_ID (optional)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Social Media Integration
              </CardTitle>
              <CardDescription>
                Display social media links and profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Twitter</span>
                  <StatusBadge enabled={status?.social.twitter || false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">LinkedIn</span>
                  <StatusBadge enabled={status?.social.linkedin || false} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Instagram</span>
                  <StatusBadge enabled={status?.social.instagram || false} />
                </div>
              </div>
              {testResults?.social && (
                <Alert variant={testResults.social.success ? 'default' : 'destructive'}>
                  <AlertDescription>{testResults.social.message}</AlertDescription>
                </Alert>
              )}
              <div className="text-sm text-muted-foreground">
                <p>Environment variables:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>TWITTER_USERNAME (optional)</li>
                  <li>LINKEDIN_PROFILE (optional)</li>
                  <li>INSTAGRAM_USERNAME (optional)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IntegrationCard({
  title,
  icon,
  status,
  testResult,
}: {
  title: string;
  icon: React.ReactNode;
  status: 'configured' | 'partial' | 'disabled';
  testResult?: { success: boolean; message: string };
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          {status === 'configured' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          {status === 'partial' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
          {status === 'disabled' && <XCircle className="h-5 w-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Badge
            variant={
              status === 'configured' ? 'default' : status === 'partial' ? 'secondary' : 'outline'
            }
          >
            {status === 'configured' ? 'Configured' : status === 'partial' ? 'Partial' : 'Not Configured'}
          </Badge>
          {testResult && (
            <p className="text-xs text-muted-foreground">{testResult.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ enabled }: { enabled: boolean }) {
  return (
    <Badge variant={enabled ? 'default' : 'outline'} className="text-xs">
      {enabled ? (
        <>
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Enabled
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3 mr-1" />
          Disabled
        </>
      )}
    </Badge>
  );
}
