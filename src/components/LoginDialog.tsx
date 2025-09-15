import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
// import { Button } from "./ui/button";

export default function LoginDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-muted rounded-xl shadow-lg w-full max-h-[78vh] sm:max-h-[98vh] max-w-[90vw] md:max-w-5/7 lg:max-w-1/3 p-6 md:p-10 relative mb-15 sm:mb-0">
        <div className="flex flex-col gap-1 sm:gap-3  md:gap-6">
          <a
            href="/login"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Talk Wide
          </a>
          <LoginForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
