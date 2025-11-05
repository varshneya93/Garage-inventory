import { IntegrationManager } from '@/components/admin/integrations/integration-manager';

export const metadata = {
  title: 'Integrations - Admin Dashboard',
  description: 'Manage external service integrations',
};

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto py-8">
      <IntegrationManager />
    </div>
  );
}
