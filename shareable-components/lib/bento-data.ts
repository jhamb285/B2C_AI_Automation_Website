export type BentoTile =
  | { id: "live_analytics"; title: "Live analytics" }
  | { id: "voice"; title: "Voice automation" }
  | { id: "email"; title: "Email campaigns" }
  | { id: "ai_content"; title: "AI content" }
  | { id: "web"; title: "Web scraping" }
  | { id: "lifecycle"; title: "Lead lifecycle" }
  | { id: "crm"; title: "CRM integration" };

export const TILES: BentoTile[] = [
  { id: "live_analytics", title: "Live analytics" },
  { id: "voice", title: "Voice automation" },
  { id: "email", title: "Email campaigns" },
  { id: "ai_content", title: "AI content" },
  { id: "web", title: "Web scraping" },
  { id: "lifecycle", title: "Lead lifecycle" },
  { id: "crm", title: "CRM integration" },
];