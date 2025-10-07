// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

// Utility function to determine if the stage is production
const isProd = (stage: string) => stage.startsWith("prod");

// Interface for additional email identities
interface Identity {
  name: string;
  sender: string;
}

export default $config({
  app(input) {
    return {
      name: "brrrmatch-com",
      removal: isProd(input.stage) ? "retain" : "remove",
      home: "aws",
    };
  },

  // The main run function where all Pulumi resources are defined
  async run() {
    // Determine the domain name based on the deployment stage
    const domainName = isProd($app.stage) ? "brrrmatch.com" : `${$app.stage}.brrrmatch.com`;

    // Create a SES domain identity with DMARC policy for email sending
    const domainIdentity = new sst.aws.Email("NextEmail", {
      sender: domainName,
      dmarc: "v=DMARC1; p=quarantine; adkim=s; aspf=s;",
    });

    const emailIdentities: Identity[] = [{ name: "SupportEmail", sender: "support@pinref.com" }];

    const identities = [
      domainIdentity,
      ...emailIdentities.map((identity) =>
        isProd($app.stage)
          ? sst.aws.Email.get(identity.name, identity.sender)
          : new sst.aws.Email(identity.name, { sender: identity.sender }),
      ),
    ];

    // Deploy the Next.js application with specified domain
    new sst.aws.Nextjs("NextApp", {
      domain: {
        name: domainName,
        dns: sst.aws.dns({
          zone: "Z0312827PXN0S0STLSFQ",
        }),
      },
      server: {
        architecture: "arm64",
      },
      environment: {
        DEPLOYMENT_ENV: $app.stage,
        DATABASE_URL: process.env.DATABASE_URL!,
        AUTH_SECRET: process.env.AUTH_SECRET!,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,
        AUTH_TRUST_HOST: "true",
        NEXT_PUBLIC_APP_URL: `https://${domainName}`,
      },
      link: [...identities],
    });
  },
});
