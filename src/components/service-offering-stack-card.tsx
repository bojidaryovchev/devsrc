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
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const text = textRef.current;
    if (!card || !text) return;

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

    // Typewriter effect
    const fullText = serviceOffering.description;
    text.textContent = "";

    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const charsToShow = Math.floor(progress * fullText.length);
            text.textContent = fullText.slice(0, charsToShow);
          },
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [serviceOffering.description]);

  return (
    <div
      ref={cardRef}
      style={{
        top: `${index * 40}px`,
      }}
      className="sticky flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
    >
      <ServiceOfferingIcon type={serviceOffering.type} />
      <h2 className="mb-4 text-3xl font-bold text-gray-900">{serviceOffering.title}</h2>
      <p ref={textRef} className="min-h-[200px] text-lg leading-relaxed text-gray-600" />
    </div>
  );
};

export default ServiceOfferingStackCard;
