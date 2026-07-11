/** Per-variant colour theming for the in-world story text + slim nav. */
export type AlemaTheme = {
  script: string;
  heading: string;
  body: string;
  eyebrow: string;
  /** Optional translucent panel behind text for legibility over busy scenes. */
  panel?: string;
  panelBorder?: string;
  /** Accent used for nav buttons + the active progress dot. */
  accent?: string;
  /** Text colour that reads on top of the accent. */
  accentText?: string;
  /** Halo colour behind the 3D story text for legibility over busy scenes. */
  textOutline?: string;
};
