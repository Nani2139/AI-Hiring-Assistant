"use client";

import { Component, ComponentType, ReactNode } from "react";
import { Text } from "@/components/atoms/Text";

type State = { error: string };

export function withError<P>(View: ComponentType<P>) {
  return class ErrorWrap extends Component<P, State> {
    state: State = { error: "" };

    static getDerivedStateFromError(error: Error) {
      return { error: error.message };
    }

    render(): ReactNode {
      if (this.state.error) {
        return <Text className="font-sans text-sm text-[var(--danger)]">{this.state.error}</Text>;
      }
      return <View {...this.props} />;
    }
  };
}
