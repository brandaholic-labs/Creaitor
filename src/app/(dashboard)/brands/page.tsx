import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BrandsPage() {
  const placeholderBrands = [
    { id: 1, name: 'Fitness Studio XY', status: 'Active', posts: 8 },
    { id: 2, name: 'Bakery Budapest', status: 'Active', posts: 12 },
    { id: 3, name: 'Tech Startup', status: 'Active', posts: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Brands</h1>
          <p className="text-muted-foreground">
            Manage your client brands and their social profiles
          </p>
        </div>
        <Button disabled>
          + New Brand (Epic 3)
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {placeholderBrands.map((brand) => (
          <Card key={brand.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{brand.name}</CardTitle>
                <Badge variant="secondary">{brand.status}</Badge>
              </div>
              <CardDescription>
                {brand.posts} scheduled posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Manage Brand
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brand Management</CardTitle>
          <CardDescription>
            Full brand management features coming in Epic 3
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Create and edit brands</p>
          <p>• Connect Facebook & Instagram accounts</p>
          <p>• Configure Brand Brain (TOV, key messages, example posts)</p>
        </CardContent>
      </Card>
    </div>
  );
}
