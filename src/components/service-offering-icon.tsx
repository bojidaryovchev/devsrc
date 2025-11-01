import { cn } from "@/lib/utils";
import { ServiceOfferingType } from "@/types/service-offering-type.enum";
import { Code, Megaphone, Smartphone, TrendingUp } from "lucide-react";
import React from "react";

interface Props {
  type: ServiceOfferingType;
}

const ServiceOfferingIcon: React.FC<Props> = ({ type }) => {
  return (
    <>
      <div
        className={cn("mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white", {
          "bg-blue-600": type === ServiceOfferingType.WEB,
          "bg-purple-700": type === ServiceOfferingType.MOBILE,
          "bg-cyan-600": type === ServiceOfferingType.SEO,
          "bg-teal-600": type === ServiceOfferingType.AD_CAMPAIGN,
        })}
      >
        {type === ServiceOfferingType.WEB && <Code className="h-8 w-8" />}
        {type === ServiceOfferingType.MOBILE && <Smartphone className="h-8 w-8" />}
        {type === ServiceOfferingType.SEO && <TrendingUp className="h-8 w-8" />}
        {type === ServiceOfferingType.AD_CAMPAIGN && <Megaphone className="h-8 w-8" />}
      </div>
    </>
  );
};

export default ServiceOfferingIcon;
