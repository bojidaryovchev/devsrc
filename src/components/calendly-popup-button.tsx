"use client";

import { useCalendly } from "@/hooks/use-calendly";
import type { CalendlyPopupWidgetOptions, CalendlyPrefill, CalendlyUtm } from "@/typings/calendly";
import React from "react";

export interface CalendlyPopupButtonProps {
  url: string;
  prefill?: CalendlyPrefill;
  utm?: CalendlyUtm;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

/**
 * Calendly Popup Button Component
 * Opens Calendly scheduling in a popup modal when clicked
 * Based on: https://help.calendly.com/hc/en-us/articles/31618265722775
 */
const CalendlyPopupButton: React.FC<CalendlyPopupButtonProps> = ({
  url,
  prefill,
  utm,
  children,
  text = "Schedule time with me",
  className = "",
  backgroundColor,
  textColor,
  primaryColor,
}) => {
  const isCalendlyLoaded = useCalendly();

  const handleClick = () => {
    if (!window.Calendly) {
      console.error("Calendly is not loaded yet");
      return;
    }

    const options: CalendlyPopupWidgetOptions = {
      url,
    };

    if (prefill) {
      options.prefill = prefill;
    }

    if (utm) {
      options.utm = utm;
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

    window.Calendly.initPopupWidget(options);
  };

  return (
    <button onClick={handleClick} disabled={!isCalendlyLoaded} className={className} type="button">
      {children || text}
    </button>
  );
};

export default CalendlyPopupButton;
