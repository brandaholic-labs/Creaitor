import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold font-heading">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input id="name" placeholder="User Name" disabled />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="user@agency.com" disabled />
          </div>
          <Button disabled>Save Changes (Epic 2)</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agency Settings</CardTitle>
          <CardDescription>
            Manage your agency information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="agency" className="text-sm font-medium">
              Agency Name
            </label>
            <Input id="agency" placeholder="My Agency" disabled />
          </div>
          <Button disabled>Update Agency (Epic 2)</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Theme (Light/Dark mode - P1)</p>
          <p>• Language preferences</p>
          <p>• Notification settings</p>
        </CardContent>
      </Card>
    </div>
  );
}
