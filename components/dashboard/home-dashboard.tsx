import { ActivityFeed } from "./sections/activity-feed";
import { DashboardStats } from "./sections/dashboard-stats";
import { HeroSection } from "./sections/hero-section";
import { OverviewGrid } from "./sections/overview-grid";
import { QuickActions } from "./sections/quick-actions";

export function HomeDashboard() {
  return (
    <div className="space-y-8">
      <HeroSection />

      <DashboardStats />

      <OverviewGrid />

      <QuickActions />

      <ActivityFeed />
    </div>
  );
}