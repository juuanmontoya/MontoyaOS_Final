import { ActivityFeed } from "./sections/activity-feed";
import { HeroSection } from "./sections/hero-section";
import { OverviewGrid } from "./sections/overview-grid";
import { QuickActions } from "./sections/quick-actions";

export function HomeDashboard() {
  return (
    <div className="space-y-10">
      <HeroSection />

      <OverviewGrid />

      <QuickActions />

      <ActivityFeed />
    </div>
  );
}