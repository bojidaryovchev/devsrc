"use server";

import { prisma } from "@/lib/prisma";
import type { ActionResult } from "@/types/action-result.type";
import type { NewsletterSubscriber } from "@prisma/client";

export async function prismaGetAllNewsletterSubscribers(): Promise<ActionResult<NewsletterSubscriber[]>> {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: subscribers,
    };
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch newsletter subscribers",
    };
  }
}
