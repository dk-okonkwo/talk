import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "iconsax-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import svimg from "../assets/images/saved.png";
import { makeNotifications, UserNotification } from "@/data/notification-data";
import { useWindowWidth } from "@/utils/UI-functions";

function TalkNotifications() {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const initialYs = notifications.map((_, idx) => -4 * idx);
  const initialOps = notifications.map((_, idx) => 1 - 0.2 * idx);
  const [yValues, setYValues] = useState(initialYs);
  const [isOpen, setIsOpen] = useState(false);
  const initialWidths = notifications.map((_, idx) => 200 - 10 * idx);
  const [widthValues, setWidthValues] = useState(initialWidths);
  const [ops, setOps] = useState(initialOps);

  var screenWidth = useWindowWidth();

  useEffect(() => {
    const notifs = makeNotifications(10);
    setNotifications(notifs);
  }, []);

  function togglePosition() {
    if (isOpen) {
      setYValues(initialYs);
      setWidthValues(initialWidths);
      setOps(initialOps);
      setIsOpen(false);
    } else {
      const openYs = notifications.map((_, idx) => 10 * (idx + 1));
      const newWidths = new Array(notifications.length).fill(220);
      const newOps = new Array(notifications.length).fill(1);
      setWidthValues(newWidths);
      setYValues(openYs);
      setOps(newOps);
      setIsOpen(true);
    }
  }

  function markAsRead(index: number) {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="">
      <ScrollArea
        className={`min-h-15 relative rounded-sm max-h-105 p-2 min-w-10 sm:min-w-52 ${isOpen && "bg-secondary"}`}
      >
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          className="absolute top-0 right-0 z-50"
        >
          <Button
            type="button"
            onClick={() => togglePosition()}
            className="rounded-full h-fit !max-h-fit !p-1 !w-fit"
          >
            <X />
          </Button>
        </motion.div>
        {notifications.map((ntf, i) => (
          <motion.div
            key={ntf.id ?? i}
            role="button"
            onClick={() => {
              if (i === 0) togglePosition();
            }}
            className={`hover:cursor-pointer h-10 flex items-center  border shadow-xs hover:bg-accent justify-center bg-white ${isOpen ? "border shadow-xs hover:bg-accent" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}  ${!isOpen && i > 2 && "hidden"} ${!isOpen && screenWidth <= 640 ? "!w-10 rounded-full" : "rounded-sm"}`}
            animate={{ y: yValues[i], opacity: ops[i] }}
            transition={{ type: "spring" }}
            style={{
              width: widthValues[i],
              zIndex: notifications.length - i,
            }}
          >
            {i == 0 ? (
              <div className="flex w-full items-center gap-3 sm:gap-5  p-2 px-3 justify-center sm:justify-normal">
                <span
                  className={`font-bold ${!isOpen ? "hidden sm:flex" : "flex"}`}
                >
                  Notifications{" "}
                </span>
                <div
                  className={`ring-2 aspect-square p-1 rounded-full ${notifications.length > 0 ? "ring-primary" : "ring-gray-300"}`}
                >
                  <Notification className="!w-4 stroke-[var(--bg-text)]" />
                </div>
              </div>
            ) : (
              <div
                className={`flex w-full items-center gap-2 justify-between p-1 px-3 h-full ${!isOpen ? "hidden" : "flex"}`}
              >
                <Avatar className="border">
                  <AvatarImage src={ntf.imgUrl} alt="NF" />
                  <AvatarFallback>NF</AvatarFallback>
                </Avatar>
                <span className="h-full w-full truncate flex items-center text-xs text-wrap">
                  {ntf.name}
                </span>
                <Button
                  variant="outline"
                  onClick={() => markAsRead(i)}
                  className="rounded-full !p-1 max-h-fit max-w-fit w-fit h-fit aspect-square relative hover:cursor-pointer"
                >
                  <X className="w-4 md:w-5 xl:w-6 stroke-muted-foreground " />
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default TalkNotifications;
