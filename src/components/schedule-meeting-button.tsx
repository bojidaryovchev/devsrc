"use client";

import CalendlyDialog from "@/components/calendly-dialog";
import type React from "react";

const ScheduleMeetingButton: React.FC = () => {
  return (
    <CalendlyDialog
      url="https://calendly.com/bojidaryovchev1/30min"
      triggerText="Schedule a Meeting"
      triggerClassName="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      title="Schedule a Meeting"
      description="Choose a convenient time for our meeting."
    />
  );
};

export default ScheduleMeetingButton;
