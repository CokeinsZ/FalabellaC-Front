"use client";
import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Login from "../organisms/Login";

type Status = "checking" | "no" | "authed";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("checking");

  const checkToken = useCallback(() => {
    const hasToken = !!Cookies.get("token");
    setStatus(hasToken ? "authed" : "no");
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const handleLoginClose = () => {
    checkToken();
  };

  if (status === "checking") {
    return null;
  }

  if (status === "no") {
    return <Login isOpen onClose={handleLoginClose} />;
  }

  // status === 'authed'
  return <>{children}</>;
}
