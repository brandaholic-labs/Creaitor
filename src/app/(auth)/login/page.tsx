import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 text-white font-bold text-xl">
              C
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Welcome to Creaitor
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="user@agency.com"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled
            />
          </div>
          <Button className="w-full" disabled>
            Sign In (Epic 2: Auth)
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Authentication will be implemented in Epic 2: Multi-Tenant Authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
