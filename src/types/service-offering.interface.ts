import { ServiceOfferingType } from "@/types/service-offering-type.enum";

export interface ServiceOffering {
  type: ServiceOfferingType;
  title: string;
  description: string;
}
