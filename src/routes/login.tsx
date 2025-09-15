import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Wing } from "iconsax-react";
import whiteLG from "../assets/images/whitelogy.png";
import { CustomTextField } from "@/components/custom-form-field";
import { User, Lock } from "iconsax-react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.navigate({ to: "/" });
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {/* login logo and form */}
      <form
        onSubmit={onSubmit}
        className="p-2 rounded-sm flex flex-col items-center justify-between gap-2"
      >
        <Wing variant="Bold" className="w-30 h-24 fill-secondary" />
        <CustomTextField FieldIcon={User} type="email" />
        <CustomTextField FieldIcon={Lock} type="password" />
        <Button
          type="submit"
          className="text-primary font-bold rounded-sm bg-secondary hover:bg-white shadow-md shadow-black/20 w-75 mt-15"
        >
          LOGIN
        </Button>
      </form>
      <img
        src={whiteLG}
        alt="white logo"
        className="absolute top-5 left-0 w-80"
      />
    </div>
  );
}
