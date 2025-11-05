'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { setAnalyticsConsent, hasAnalyticsConsent } from '@/lib/analytics';

export function AnalyticsConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('analytics_consent');
    if (hasConsent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-3xl p-6 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Privacy & Analytics</h3>
            <p className="text-sm text-muted-foreground">
              We use analytics to understand how visitors interact with our portfolio. 
              This helps us improve your experience. No personal data is collected.
            </p>
          </div>
          <div className="flex gap-2 sm:flex-shrink-0">
            <Button variant="outline" onClick={handleDecline}>
              Decline
            </Button>
            <Button onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
