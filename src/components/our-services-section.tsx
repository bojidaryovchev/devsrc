"use client";

import ServiceOfferingStackCard from "@/components/service-offering-stack-card";
import { SERVICE_OFFERINGS } from "@/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const OurServicesSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div ref={headerRef} className="mb-32 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Our Services</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">Scroll down to explore our comprehensive solutions</p>
        </div>

        <div className="space-y-8">
          {SERVICE_OFFERINGS.map((serviceOffering, index) => (
            <ServiceOfferingStackCard key={serviceOffering.title} serviceOffering={serviceOffering} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServicesSection;
