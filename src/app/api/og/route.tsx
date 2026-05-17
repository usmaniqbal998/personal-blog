import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

// ── Palette: Plasma (hardcoded) ───────────────────────────────────────────────
const C1 = "#f472b6"; // pink
const C2 = "#8b5cf6"; // violet

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

const C1_RGB = hexToRgb(C1);
const C2_RGB = hexToRgb(C2);

// ── Pre-computed static data ──────────────────────────────────────────────────

function seededRng(i: number) {
  const x = Math.sin(i * 9301 + 42 * 49297) * 233280;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 55 }, (_, i) => ({
  left: seededRng(i * 3) * 100,
  top: seededRng(i * 3 + 1) * 100,
  size: seededRng(i * 3 + 2) * 0.9 + 0.2,
  opacity: seededRng(i * 7) * 0.28 + 0.08,
}));

// ── Font & asset loading (module-level cache) ─────────────────────────────────

interface FontAssets {
  instrumentSerifItalic: ArrayBuffer;
  interRegular: ArrayBuffer;
  interMedium: ArrayBuffer;
  jetbrainsMono: ArrayBuffer;
}

let fontCache: FontAssets | null = null;
let portraitCache: string | null = null;

function bufToArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer;
}

function font(name: string): Promise<ArrayBuffer> {
  return readFile(join(process.cwd(), "src", "fonts", name)).then(
    bufToArrayBuffer,
  );
}

async function getFonts(): Promise<FontAssets> {
  if (fontCache) return fontCache;
  const [instrumentSerifItalic, interRegular, interMedium, jetbrainsMono] =
    await Promise.all([
      font("InstrumentSerif-Italic.ttf"),
      font("Inter-Regular.woff"),
      font("Inter-Medium.woff"),
      font("JetBrainsMono-Regular.woff"),
    ]);
  fontCache = {
    instrumentSerifItalic,
    interRegular,
    interMedium,
    jetbrainsMono,
  };
  return fontCache;
}

async function getPortrait(): Promise<string> {
  if (portraitCache) return portraitCache;
  const buf = await readFile(
    join(process.cwd(), "public", "static", "usman-portrait.png"),
  );
  portraitCache = `data:image/png;base64,${buf.toString("base64")}`;
  return portraitCache;
}

// ── Date formatter ────────────────────────────────────────────────────────────

function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  try {
    const [year, month, day] = isoDate.split("T")[0].split("-").map(Number);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month - 1, day)));
  } catch {
    return isoDate;
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Untitled";
  const description = searchParams.get("description") ?? "";
  const tag = searchParams.get("tag") ?? "NOTES";
  const date = formatDate(searchParams.get("date") ?? "");
  const readTime = searchParams.get("readTime") ?? "";

  const [fonts, portrait] = await Promise.all([getFonts(), getPortrait()]);

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        background: "#05060a",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Fine grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(rgba(120,130,160,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,160,0.055) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          display: "flex",
        }}
      />
      {/* Major grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(rgba(160,170,200,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(160,170,200,0.04) 1px, transparent 1px)`,
          backgroundSize: "256px 256px",
          display: "flex",
        }}
      />
      {/* Stars */}
      {STARS.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${star.left.toFixed(2)}%`,
            top: `${star.top.toFixed(2)}%`,
            width: star.size * 2,
            height: star.size * 2,
            borderRadius: "50%",
            background: `rgba(200,210,240,${star.opacity.toFixed(3)})`,
            display: "flex",
          }}
        />
      ))}

      {/* Colour vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
              radial-gradient(ellipse 55% 70% at 0% 50%, rgba(${C1_RGB},0.10), transparent 65%),
              radial-gradient(ellipse 60% 80% at 100% 20%, rgba(${C2_RGB},0.12), transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 100%, rgba(${C2_RGB},0.06), transparent 70%),
              radial-gradient(ellipse 50% 50% at 50% 50%, transparent 30%, #05060a 90%)
            `,
          display: "flex",
        }}
      />

      {/* Portrait silhouette — right side */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 320,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <img
          src={portrait}
          alt=""
          style={{
            position: "absolute",
            bottom: -10,
            right: -20,
            height: "95%",
            width: "auto",
            opacity: 0.18,
            filter: "saturate(0.4) brightness(1.2)",
          }}
        />
        {/* Gradient fade replaces mask-image (not supported in Satori) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, #05060a 0%, transparent 55%)",
            display: "flex",
          }}
        />
      </div>

      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: `linear-gradient(180deg, transparent 0%, ${C1} 30%, ${C2} 70%, transparent 100%)`,
          boxShadow: `0 0 18px rgba(${C1_RGB},0.5)`,
          display: "flex",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 64px 48px",
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand mark + label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg viewBox="0 0 32 32" width={22} height={22}>
              <circle
                cx="16"
                cy="16"
                r="13"
                stroke={C1}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="60 40"
              />
              <circle
                cx="16"
                cy="16"
                r="9"
                stroke={C2}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="40 30"
              />
              <circle cx="16" cy="16" r="2.5" fill={C1} />
            </svg>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8b91a8",
                gap: 0,
              }}
            >
              <span>USMAN</span>
              <span style={{ color: "#4a5068", margin: "0 6px" }}>/</span>
              <span>FIELD NOTES</span>
            </div>
          </div>

          {/* Category tag */}
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: 999,
              color: C1,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: `rgba(${C1_RGB},0.35)`,
              background: `rgba(${C1_RGB},0.07)`,
            }}
          >
            {tag}
          </div>
        </div>

        {/* ── Middle: eyebrow + title + TL;DR ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 820,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "JetBrains Mono",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C1,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 20,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${C1})`,
                display: "flex",
              }}
            />
            <span>FIELD NOTES</span>
          </div>

          {/* Post title */}
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 52,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#e8eaf1",
              marginBottom: 28,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>

          {/* TL;DR row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C1,
                paddingTop: 3,
                flexShrink: 0,
              }}
            >
              TL;DR
            </span>
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: "rgba(140,150,180,0.18)",
                flexShrink: 0,
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 16,
                lineHeight: 1.6,
                color: "#8b91a8",
              }}
            >
              {description}
            </span>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Avatar */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                overflow: "hidden",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: `rgba(${C1_RGB},0.4)`,
                boxShadow: `0 0 12px rgba(${C1_RGB},0.2)`,
                display: "flex",
                flexShrink: 0,
              }}
            >
              <img
                src={portrait}
                alt="Usman"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transform: "scale(1.25) translateY(5%)",
                }}
              />
            </div>
            {/* Name + meta */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#e8eaf1",
                  letterSpacing: "0.01em",
                }}
              >
                Usman
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  color: "#4a5068",
                  textTransform: "uppercase",
                }}
              >
                {date}
                {readTime ? ` · ${readTime}` : ""}
              </span>
            </div>
          </div>

          {/* Blog URL */}
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 11.5,
              letterSpacing: "0.14em",
              color: "#4a5068",
            }}
          >
            usman-iqbal.blog
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Instrument Serif",
          data: fonts.instrumentSerifItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: "Inter",
          data: fonts.interRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: fonts.interMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "JetBrains Mono",
          data: fonts.jetbrainsMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
