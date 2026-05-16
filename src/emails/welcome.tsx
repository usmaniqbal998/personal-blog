import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

export function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Field Notes — you&apos;re in.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={eyebrow}>FIELD NOTES · DISPATCH</Text>
          <Heading style={heading}>You&apos;re in.</Heading>
          <Text style={text}>Welcome. Glad you made it here.</Text>
          <Text style={text}>
            You&apos;ll get an email roughly every other Sunday — notes from
            what I&apos;m building, thinking about, or breaking. No noise, just
            signal.
          </Text>
          <Text style={text}>
            First issue will land in your inbox soon. Until then, feel free to
            browse the archive at{" "}
            <Link
              href={
                process.env.NEXT_PUBLIC_SITE_URL ?? "https://fieldnotes.blog"
              }
              style={link}
            >
              fieldnotes.blog
            </Link>
            .
          </Text>
          <Hr style={hr} />
          <Text style={footerText}>
            — Usman ·{" "}
            <Link
              href={
                process.env.NEXT_PUBLIC_SITE_URL ?? "https://fieldnotes.blog"
              }
              style={link}
            >
              fieldnotes.blog
            </Link>
          </Text>
          <Text style={footerText}>
            <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={mutedLink}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#05060a",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "48px 32px",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "10px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#f472b6",
  margin: "0 0 28px",
};

const heading: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontWeight: 400,
  fontSize: "36px",
  lineHeight: "1.1",
  color: "#e8eaf1",
  margin: "0 0 20px",
  letterSpacing: "-0.01em",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.65",
  color: "#8b91a8",
  margin: "0 0 16px",
};

const hr: React.CSSProperties = {
  borderColor: "rgba(140,150,180,0.12)",
  margin: "32px 0",
};

const footerText: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "11px",
  letterSpacing: "0.08em",
  color: "#4a5068",
  margin: "0 0 8px",
};

const link: React.CSSProperties = {
  color: "#f472b6",
  textDecoration: "none",
};

const mutedLink: React.CSSProperties = {
  color: "#4a5068",
};
