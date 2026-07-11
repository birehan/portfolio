"use client";

import { AlemaExperience } from "@/components/alema/AlemaExperience";

/**
 * The private `/alema` route. All logic lives in <AlemaExperience/> which is a
 * client component (the whole thing is interactive + 3D, so nothing is
 * server-rendered here).
 */
export default function AlemaPage() {
  return <AlemaExperience />;
}
