// Calendly TypeScript definitions based on latest documentation
// https://help.calendly.com/hc/en-us/articles/31618265722775

export interface CalendlyPrefill {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  customAnswers?: Record<string, string>;
  guests?: string[];
  date?: Date;
}

export interface CalendlyUtm {
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}

export interface CalendlyInlineWidgetOptions {
  url: string;
  parentElement: HTMLElement;
  prefill?: CalendlyPrefill;
  utm?: CalendlyUtm;
  resize?: boolean;
  hideEventTypeDetails?: boolean;
  hideGdprBanner?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

export interface CalendlyPopupWidgetOptions {
  url: string;
  prefill?: CalendlyPrefill;
  utm?: CalendlyUtm;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

export interface CalendlyBadgeWidgetOptions {
  url: string;
  text: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
}

export interface CalendlyEventPayload {
  event: string;
  payload?: {
    event?: {
      uri?: string;
    };
    invitee?: {
      uri?: string;
      name?: string;
      email?: string;
    };
  };
}

export type CalendlyEvent =
  | "calendly.profile_page_viewed"
  | "calendly.event_type_viewed"
  | "calendly.date_and_time_selected"
  | "calendly.event_scheduled";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: CalendlyInlineWidgetOptions) => void;
      initPopupWidget: (options: CalendlyPopupWidgetOptions) => void;
      initBadgeWidget: (options: CalendlyBadgeWidgetOptions) => void;
      closePopupWidget: () => void;
      destroyBadgeWidget: () => void;
    };
  }
}
