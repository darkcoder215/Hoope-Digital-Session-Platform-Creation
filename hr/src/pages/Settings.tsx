import { useAuth } from '@/lib/auth';
import { Avatar, Badge, Button, Card, Input } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fullName } from '@/lib/format';

export default function Settings() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <PageContainer title="Settings" subtitle="Your profile and preferences" module="dashboard">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <Card>
          <div className="flex items-center gap-4 mb-4">
            <Avatar name={fullName(user)} size={64} />
            <div>
              <h3>{fullName(user)}</h3>
              <p className="text-text-low text-xs">{user.jobTitle}</p>
              <Badge tone="orange" className="mt-1">{user.role.replace('_',' ')}</Badge>
            </div>
          </div>
          <Button variant="ghost" onClick={logout} className="w-full">Sign out</Button>
        </Card>
        <Card>
          <h3 className="mb-4">Account</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="label">First name</label><Input defaultValue={user.firstName} /></div>
            <div><label className="label">Last name</label><Input defaultValue={user.lastName} /></div>
            <div className="sm:col-span-2"><label className="label">Email</label><Input defaultValue={user.email} readOnly /></div>
            <div><label className="label">Office</label><Input defaultValue={user.office} readOnly /></div>
            <div><label className="label">Phone</label><Input defaultValue={user.phone ?? ''} /></div>
          </div>
          <p className="text-text-low text-xs mt-4">Changes are demo-only and not persisted.</p>
        </Card>
      </div>
    </PageContainer>
  );
}
