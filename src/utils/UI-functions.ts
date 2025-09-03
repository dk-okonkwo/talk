import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    // optional: run once to ensure initial state is correct after mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
