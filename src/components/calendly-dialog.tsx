"use client";

import CalendlyInlineWidget from "@/components/calendly-inline-widget";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCalendlyTheme } from "@/hooks/use-calendly-theme";
import type { CalendlyPrefill, CalendlyUtm } from "@/types/calendly.d";
import React from "react";

export interface CalendlyDialogProps {
  url: string;
  prefill?: CalendlyPrefill;
  utm?: CalendlyUtm;
  children?: React.ReactNode;
  triggerText?: string;
  triggerClassName?: string;
  title?: string;
  description?: string;
  hideEventTypeDetails?: boolean;
  hideGdprBanner?: boolean;
}

/**
 * Calendly Dialog Component
 * Opens Calendly scheduling widget in a shadcn dialog modal
 */
const CalendlyDialog: React.FC<CalendlyDialogProps> = ({
  url,
  prefill,
  utm,
  children,
  triggerText = "Schedule a Meeting",
  triggerClassName = "rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700",
  title = "Schedule a Meeting",
  description = "Select a date and time that works for you.",
  hideEventTypeDetails = false,
  hideGdprBanner = false,
}) => {
  const calendlyTheme = useCalendlyTheme();

  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>{children || triggerText}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <CalendlyInlineWidget
            url={url}
            prefill={prefill}
            utm={utm}
            hideEventTypeDetails={hideEventTypeDetails}
            hideGdprBanner={hideGdprBanner}
            styles={{
              minWidth: "320px",
              height: "600px",
            }}
            {...calendlyTheme}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyDialog;
