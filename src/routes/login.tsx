import { createFileRoute, useRouter } from "@tanstack/react-router";
import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { UserSignInFormDefaultValues } from "@/lib/constants";
import { FormFieldType } from "@/lib/types";
import { UserSignInFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth, User } from "@/utils/auth";
import { toast } from "sonner";
import { profile } from "console";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/login")({
  component: SignIn,
});

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const form = useForm<z.infer<typeof UserSignInFormValidation>>({
    resolver: zodResolver(UserSignInFormValidation),
    defaultValues: UserSignInFormDefaultValues,
  });

  const signInWithGoogle = () => {
    console.log("sign in with google");
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserSignInFormValidation>) {
    setIsLoading(true);

    try {
      console.log("data to get saved", values);
      const datares = await axios.post(
        "https://talk-l955.onrender.com/api/v1/auth/login",
        values,
        { withCredentials: true }
      );
      if (datares.status === 200 || datares.status === 201) {
        const tokenData = datares.data.token ?? {};
        const access = tokenData.access;
        const expires_in_secs =
          tokenData.expires_in_secs ?? tokenData.expires_in_seconds;

        // compute days safely
        const expiresDays =
          typeof expires_in_secs !== "undefined" &&
          !Number.isNaN(Number(expires_in_secs))
            ? Number(expires_in_secs) / (60 * 60 * 24)
            : 7; // fallback to 7 days

        if (access) {
          // save token in cookie (client-side) AND set axios header for immediate requests
          Cookies.set("access_token", access, { expires: expiresDays });
          axios.defaults.headers.common.Authorization = `Bearer ${access}`;
        }

        const res_user = datares.data.user ?? {};
        const loggedInUser: User = {
          id: res_user.user_id ?? String(res_user.id ?? ""),
          first_name: res_user.first_name ?? res_user.firstName ?? "",
          last_name: res_user.last_name ?? res_user.lastName ?? "",
          email: res_user.email ?? "",
          profileImageUrl:
            res_user.profile_image_url ?? res_user.profileImageUrl ?? "",
          userRole: res_user.user_role ?? res_user.role ?? "",
        };

        setUser(loggedInUser);
        console.log("User logged in:", loggedInUser);

        console.log("Tokens saved in cookies");

        router.navigate({ to: "/" });
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
      if (error.response.status === 401) {
        toast("Oops error logging in", {
          description: "User not recognized",
        });
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="flex gap-8 w-full bg-talkBG flex-col items-center  text-center min-h-screen px-4 py-2 bg-gradient-to-b from-main/90 to-transparent to-40%">
      <img
        src="/images/talk-logo.png"
        alt="Talk Logo"
        className="w-fit mx-auto"
      />
      <div>
        <h2 className="text-2xl poppins-semibold font-medium mb-1">
          Sign In to Talk
        </h2>
        <p className="opacity-80 text-sm tracking-wider">
          Please fill your credentitials to continue
        </p>
      </div>
      <button
        onClick={signInWithGoogle}
        className="flex  items-center gap-2 border border-black/20 divide-x rounded-lg shadow-xs px-6 py-2"
      >
        <img
          src="/images/google.png"
          alt="Google Logo"
          className="w-8 h-8 mx-auto "
        />
        <p className="text-sm tracking-wide">Sign in with Google</p>
      </button>
      <Toaster />
      <div className="relative w-full">
        <Separator />
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-talkBG px-0.5">
          OR
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-lg flex flex-col justify-between w-full *:w-full "
        >
          <div className="space-y-5">
            <CustomFormField
              control={form.control}
              name="email"
              fieldType={FormFieldType.INPUT}
              icon={<Mail />}
              placeholder="Enter your Email"
              type="email"
            />
            <div className="space-y-1">
              <CustomFormField
                control={form.control}
                name="password"
                fieldType={FormFieldType.INPUT}
                icon={<Lock />}
                placeholder="Enter your Password"
                type="password"
              />
              <p className="text-right text-black/80 text-xs font-light">
                Forgot Password ?
              </p>
            </div>
            <CustomFormField
              control={form.control}
              name="rememberMeConsent"
              fieldType={FormFieldType.CHECKBOX}
              label={<p className="text-sm">Remember me</p>}
            />
          </div>
          <div className="space-y-2">
            <Button
              disabled={isLoading}
              className={
                "text-base py-5 w-full tracking-wide text-white rounded-lg mt-3 bg-main hover:bg-main/90"
              }
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
            <p className="text-black/70 text-sm tracking-wide">
              Don&apos;t have an account ?{" "}
              <Link to="/signup" className="text-main underline">
                Sign-Up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </main>
  );
}
