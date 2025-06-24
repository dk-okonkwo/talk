import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Events from "@/components/Events";
import { Link } from "@tanstack/react-router";

export function BillTabs() {
  return (
    <Tabs defaultValue="news" className="items-center">
      <TabsList className="grid w-60 sm:min-w-100 grid-cols-2 p-1 h-auto bg-[var(--secondary-bg)]">
        <TabsTrigger
          value="news"
          className="font-bold text-sm md:text-md lg:text-lg data-[state=active]:text-[var(--primary)] hover:cursor-pointer rounded-sm"
        >
          News
        </TabsTrigger>
        <TabsTrigger
          value="events"
          className="font-bold text-sm md:text-md lg:text-lg data-[state=active]:text-[var(--primary)] hover:cursor-pointer rounded-sm"
        >
          Events
        </TabsTrigger>
      </TabsList>
      <TabsContent value="news">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            <Link to="/sign-in">
              <Button>Sign in</Button>
            </Link>
            <Link to="/sign-in">
              <Button>Sign in</Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="events">
        <Events />
      </TabsContent>
    </Tabs>
  );
}
