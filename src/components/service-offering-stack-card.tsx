import ServiceOfferingIcon from "@/components/service-offering-icon";
import { ServiceOffering } from "@/types/service-offering.interface";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface Props {
  serviceOffering: ServiceOffering;
  index: number;
}

const ServiceOfferingStackCard: React.FC<Props> = ({ serviceOffering, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      {
        scale: 0.8,
        opacity: 0.6,
      },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        top: `${index * 40}px`,
      }}
      className="sticky flex min-h-[400px] flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
    >
      <ServiceOfferingIcon type={serviceOffering.type} />
      <h2 className="mb-4 text-3xl font-bold text-gray-900">{serviceOffering.title}</h2>
      <p className="text-lg leading-relaxed text-gray-600">{serviceOffering.description}</p>
    </div>
  );
};

export default ServiceOfferingStackCard;
