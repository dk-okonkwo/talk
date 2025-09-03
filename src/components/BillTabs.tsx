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
import { toast, Toaster } from "sonner";
import axios from "axios";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import Cookies from "js-cookie";

export function BillTabs() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUserProfile() {
    setIsLoading(true);

    const token = Cookies.get("access_token");
    // TODO: remove this console.log if it works
    console.log("fetched token:", token);
    const config: any = { withCredentials: true };

    // if your backend expects Authorization header (JS-stored token)
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    try {
      console.log("Getting user profile details");

      const datares = await axios.get(
        "https://talk-l955.onrender.com/api/v1/products/taka/list-products/?page=1"
      );
      console.log(datares);
      if (datares.status === 200 || datares.status === 201) {
        console.log("Fetch worked");

        console.log("User details", datares.data);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          console.error("SOMETHING WENT WRONG!!");
          toast("Something went wrong", {
            description: "Figure out why",
          });
          console.log("main error", error);
        } else {
          console.error(
            "Unexpected error:",
            error.response?.data || error.message
          );
          toast("Something went wrong", {
            description: "Please try again later.",
          });
        }
      } else {
        console.log("Non-Axios error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

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
            <Button onClick={() => handleUserProfile()} disabled={isLoading}>
              Get taka items
            </Button>
            <Link to="/sign-in">
              <Button>Sign in</Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="events">
        <Events />
      </TabsContent>
      <Toaster />
    </Tabs>
  );
}
