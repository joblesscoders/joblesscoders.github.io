"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import GlobeFallback from "./GlobeFallback";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("COBE WebGL Globe encountered an issue; falling back gracefully to static SVG visual:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <GlobeFallback />;
    }

    return this.props.children;
  }
}

export default GlobeErrorBoundary;
