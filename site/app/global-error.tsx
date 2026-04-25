"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#0a0a0a",
          color: "#e5e5e5",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          margin: 0,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              color: "#22d3ee",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            We hit an error.
          </h1>
          <p style={{ color: "#a1a1aa", marginBottom: 24 }}>
            {error.message || "Please try refreshing the page."}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: 6,
              background: "#22d3ee",
              color: "#0a0a0a",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
