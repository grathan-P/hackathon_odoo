"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TestPage() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("employees")
        .select("*");

      console.log("Data:", data);
      console.log("Error:", error);
    }

    testConnection();
  }, []);

  return <h1>Testing Supabase...</h1>;
}