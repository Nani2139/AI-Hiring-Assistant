"use client";

import { ComponentType, useEffect, useState } from "react";
import { Text } from "@/components/atoms/Text";

type LoadProps<T> = {
  data: T;
  reload: () => void;
};

export function withLoad<T>(load: () => Promise<T>, View: ComponentType<LoadProps<T>>) {
  return function Loaded() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState("");

    function reload() {
      setError("");
      load()
        .then(setData)
        .catch((err) => setError(err instanceof Error ? err.message : "Load failed"));
    }

    useEffect(() => {
      reload();
    }, []);

    if (error) return <Text className="font-sans text-sm text-[var(--danger)]">{error}</Text>;
    if (!data) return <Text className="font-sans text-sm text-[var(--muted)]">Loading...</Text>;
    return <View data={data} reload={reload} />;
  };
}
