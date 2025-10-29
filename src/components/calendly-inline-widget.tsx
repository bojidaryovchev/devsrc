"use client";

import { useCalendly } from "@/hooks/use-calendly";
import type { CalendlyInlineWidgetOptions, CalendlyPrefill, CalendlyUtm } from "@/types/calendly.d";
import React, { useEffect, useRef } from "react";

export interface CalendlyInlineWidgetProps {
  url: string;
  prefill?: CalendlyPrefill;
  utm?: CalendlyUtm;
  resize?: boolean;
  hideEventTypeDetails?: boolean;
  hideGdprBanner?: boolean;
  styles?: React.CSSProperties;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

/**
 * Calendly Inline Widget Component
 * Embeds Calendly scheduling directly into your page
 * Based on: https://help.calendly.com/hc/en-us/articles/31618265722775
 */
const CalendlyInlineWidget: React.FC<CalendlyInlineWidgetProps> = ({
  url,
  prefill,
  utm,
  resize = false,
  hideEventTypeDetails = false,
  hideGdprBanner = false,
  styles = {},
  className = "",
  backgroundColor,
  textColor,
  primaryColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCalendlyLoaded = useCalendly();

  useEffect(() => {
    if (!isCalendlyLoaded || !containerRef.current || !window.Calendly) {
      return;
    }

    // Clear any existing content
    containerRef.current.innerHTML = "";

    const options: CalendlyInlineWidgetOptions = {
      url,
      parentElement: containerRef.current,
      resize,
    };

    if (prefill) {
      options.prefill = prefill;
    }

    if (utm) {
      options.utm = utm;
    }

    if (hideEventTypeDetails) {
      options.hideEventTypeDetails = hideEventTypeDetails;
    }

    if (hideGdprBanner) {
      options.hideGdprBanner = hideGdprBanner;
    }

    if (backgroundColor) {
      options.backgroundColor = backgroundColor;
    }

    if (textColor) {
      options.textColor = textColor;
    }

    if (primaryColor) {
      options.primaryColor = primaryColor;
    }

    window.Calendly.initInlineWidget(options);
  }, [
    isCalendlyLoaded,
    url,
    prefill,
    utm,
    resize,
    hideEventTypeDetails,
    hideGdprBanner,
    backgroundColor,
    textColor,
    primaryColor,
  ]);

  const defaultStyles: React.CSSProperties = {
    minWidth: "320px",
    height: "700px",
    ...styles,
  };

  return <div ref={containerRef} style={defaultStyles} className={className} />;
};

export default CalendlyInlineWidget;
