"use server";

import { prisma } from "@/lib/prisma";
import {
  newsletterSubscriptionSchema,
  type NewsletterSubscriptionInput,
} from "@/schemas/newsletter-subscription.schema";
import type { ActionResult } from "@/types/action-result.type";
import type { NewsletterSubscriber } from "@prisma/client";

export async function prismaCreateNewsletterSubscriber(
  input: NewsletterSubscriptionInput,
): Promise<ActionResult<NewsletterSubscriber>> {
  try {
    const validated = newsletterSubscriptionSchema.parse(input);

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: validated.email },
    });

    if (existingSubscriber) {
      return {
        success: false,
        error: "This email is already subscribed to our newsletter",
      };
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: validated.email,
      },
    });

    return {
      success: true,
      data: subscriber,
    };
  } catch (error) {
    console.error("Error creating newsletter subscriber:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to subscribe to newsletter",
    };
  }
}
