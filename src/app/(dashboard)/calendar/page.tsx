import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Content Calendar</h1>
          <p className="text-muted-foreground">
            Plan and schedule your social media posts
          </p>
        </div>
        <Button disabled>
          + New Post (Epic 4)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Calendar View</CardTitle>
          <CardDescription>
            Calendar features coming in Epic 5: Content Calendar & Scheduling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
                className="border border-border rounded-md p-4 min-h-[100px] flex items-center justify-center text-sm text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• 7-day weekly grid view</p>
            <p>• Drag & drop post scheduling</p>
            <p>• Post status badges (Draft, Scheduled, Published)</p>
            <p>• Quick actions (Edit, Approve, Delete)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
