import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth, User } from "@/utils/auth";
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";
import { useRouterState, Link, useRouter } from "@tanstack/react-router";
import axios from "axios";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

// TODO: Remove console.log statements
export function LoginForm({ className, onClose, ...props }: FormProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  console.log("login dialog path:", pathname);

  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const signInWithGoogle = () => {
    console.log("sign in with google");
  };

  // 2. Define a submit handler.
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim())
      return toast("Email missing", {
        description: "Please enter your email address",
      });

    if (!password.trim())
      return toast("Password missing", {
        description: "Please type in your password",
      });

    setIsLoading(true);
    const userData = {
      email,
      password,
    };

    try {
      console.log("data to get saved", userData);
      const datares = await axios.post(
        "https://talk-l955.onrender.com/api/v1/auth/login",
        userData
      );
      console.log(datares);
      if (datares.status === 200) {
        const { access, expires_in_secs } = datares.data;

        const cookieOptions = {
          expires: parseInt(expires_in_secs) / (60 * 60 * 24),
        }; // session cookie
        // Save tokens in cookies
        Cookies.set("access_token", access, cookieOptions); // expires in days

        console.log("Tokens saved in cookies");

        const loggedInUser: User = {
          id: datares.data.user_id ?? "",
          first_name: datares.data.first_name ?? "",
          last_name: datares.data.last_name ?? "",
          email: datares.data.email ?? "",
          profileImageUrl: datares.data.profile_image_url ?? "",
          userRole: datares.data.user_role ?? "",
        };

        console.log("logged in user data:", loggedInUser);

        setUser(loggedInUser);

        onClose();

        router.navigate({ to: pathname });
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          console.error("Unauthorized: Invalid credentials or expired session");
          // ✅ Optionally show toast or message to user
          toast("Invalid Credentials", {
            description: "Please check your email or password.",
          });

          // ✅ Or redirect to login if needed
          // navigate({ to: '/sign-in' })
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
        console.error("Non-Axios error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-3 sm:gap-6", className)} {...props}>
      <Card className="gap-2">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-3 sm:gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  onClick={signInWithGoogle}
                  variant="outline"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 sm:gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!email.trim() || !password.trim() || isLoading}
                >
                  {isLoading ? "Loggin in..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="underline underline-offset-4"
                  onClick={onClose}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
      <Toaster />
    </div>
  );
}
