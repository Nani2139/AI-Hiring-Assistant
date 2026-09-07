"use client";

import { ComponentType, useEffect, useState } from "react";
import { Text } from "@/components/atoms/Text";

type LoadProps<T> = {
  data: T;
  reload: () => void;
};

export function withLoad<T, P>(load: () => Promise<T>, View: ComponentType<P & LoadProps<T>>) {
  return function Loaded(props: P) {
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
    return <View {...props} data={data} reload={reload} />;
  };
}
