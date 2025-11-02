"use server";

import { prismaGetAllNewsletterSubscribers } from "@/actions/prisma-get-all-newsletter-subscribers.action";
import { newsletterEmailSchema, type NewsletterEmailInput } from "@/schemas/newsletter-email.schema";
import type { ActionResult } from "@/types/action-result.type";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { Resource } from "sst";

interface EmailResult {
  totalSubscribers: number;
  successfulSends: number;
  failedSends: number;
}

export async function sendNewsletterEmail(input: NewsletterEmailInput): Promise<ActionResult<EmailResult>> {
  try {
    // Validate input
    const validated = newsletterEmailSchema.parse(input);

    // Get all subscribers
    const subscribersResult = await prismaGetAllNewsletterSubscribers();

    if (!subscribersResult.success) {
      return {
        success: false,
        error: subscribersResult.error,
      };
    }

    const subscribers = subscribersResult.data;

    if (subscribers.length === 0) {
      return {
        success: false,
        error: "No subscribers found",
      };
    }

    // Initialize SES client
    const client = new SESv2Client();

    let successfulSends = 0;
    let failedSends = 0;

    // Send emails to all subscribers
    await Promise.allSettled(
      subscribers.map(async (subscriber) => {
        try {
          await client.send(
            new SendEmailCommand({
              FromEmailAddress: `noreply@${Resource.NextEmail.sender}`,
              Destination: {
                ToAddresses: [subscriber.email],
              },
              Content: {
                Simple: {
                  Subject: {
                    Data: validated.subject,
                    Charset: "UTF-8",
                  },
                  Body: {
                    Html: {
                      Data: validated.htmlContent,
                      Charset: "UTF-8",
                    },
                  },
                },
              },
            }),
          );
          successfulSends++;
        } catch (error) {
          console.error(`Failed to send email to ${subscriber.email}:`, error);
          failedSends++;
        }
      }),
    );

    return {
      success: true,
      data: {
        totalSubscribers: subscribers.length,
        successfulSends,
        failedSends,
      },
    };
  } catch (error) {
    console.error("Error sending newsletter emails:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send newsletter emails",
    };
  }
}
