"use client";

import { prismaCreateNewsletterSubscriber } from "@/actions/prisma-create-newsletter-subscriber.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  newsletterSubscriptionSchema,
  type NewsletterSubscriptionInput,
} from "@/schemas/newsletter-subscription.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SubscribeSectionClient: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterSubscriptionInput>({
    resolver: zodResolver(newsletterSubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterSubscriptionInput) => {
    try {
      const result = await prismaCreateNewsletterSubscriber(data);

      if (!result.success) {
        toast.error(result.error);
      } else {
        toast.success("Successfully subscribed! Check your email for confirmation.");
        reset();
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="border-border/50 dark:border-border overflow-hidden rounded-xl border shadow-xl dark:shadow-2xl">
      <div className="grid min-h-[500px] grid-cols-1 md:grid-cols-2">
        {/* Left Side - Info */}
        <div className="flex flex-col justify-center bg-linear-to-br from-indigo-600 via-purple-500 to-blue-600 p-8 text-white md:p-12 dark:from-indigo-700 dark:via-purple-600 dark:to-blue-700">
          <h3 className="mb-4 text-3xl font-bold text-balance md:text-4xl">Stay Updated with Digital Trends</h3>
          <p className="text-lg leading-relaxed text-pretty opacity-90">
            Get exclusive insights, tips, and updates on web development, mobile apps, SEO strategies, and digital
            marketing delivered to your inbox.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <CircleCheckBig className="h-5 w-5 shrink-0" />
              <span className="text-sm">Weekly industry insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig className="h-5 w-5 shrink-0" />
              <span className="text-sm">Exclusive case studies</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig className="h-5 w-5 shrink-0" />
              <span className="text-sm">Early access to resources</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center bg-white p-8 md:p-12 dark:bg-gray-900">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <Label htmlFor="newsletter-email" className="text-foreground mb-2">
                Email Address
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                className="text-foreground placeholder:text-muted-foreground border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
              />
              {errors.email && <p className="text-destructive mt-1.5 text-sm">{errors.email.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="gradient-4 w-full rounded-lg" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="text-muted-foreground text-center text-xs leading-relaxed">
              Join 5,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSectionClient;
