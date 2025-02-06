"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import useSubbedit from "./hooks/useSubbedit";

export default function RouteChangeListener() {
  const pathname = usePathname();
  const subbeditName = useMemo(() => pathname.split("/")[2], [pathname]);

  const { setSubbedit } = useSubbedit();

  useEffect(() => {
    const fetchSubbedit = async () => {
      const response = await fetch(`/api/subbedit/${subbeditName}`);
      const data = await response.json();
      setSubbedit(data);
    };

    if (subbeditName) {
      fetchSubbedit();
    } else {
      setSubbedit(null);
    }
  }, [setSubbedit, subbeditName]);

  return null;
}
