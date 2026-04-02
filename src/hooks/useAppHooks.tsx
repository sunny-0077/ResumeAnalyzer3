"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* -------------------------------
   #5 Interview timer cleanup
--------------------------------*/
export const useInterviewTimer = (start: number) => {
  const [time, setTime] = useState(start);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};

/* -------------------------------
   #9 close command palette
--------------------------------*/
export const useCommandNavigation = () => {
  const router = useRouter();

  const navigate = (path: string, setOpen: any) => {
    router.push(path);
    setOpen(false);
  };

  return navigate;
};

/* -------------------------------
   #11 disable button loading
--------------------------------*/
export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
};

/* -------------------------------
   #14 sidebar active state
--------------------------------*/
export const useActivePath = (path: string, pathname: string) => {
  return pathname === path ? "active" : "";
};

/* -------------------------------
   #15 ESC close modal
--------------------------------*/
export const useEscClose = (setOpen: any) => {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("keydown", esc);
    };
  }, [setOpen]);
};
