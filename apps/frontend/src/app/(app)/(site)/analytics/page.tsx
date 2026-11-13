export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { PlatformAnalytics } from '@gitroom/frontend/components/platform-analytics/platform.analytics';
import { brandTitle } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${brandTitle()} Analytics`,
  description: '',
};
export default async function Index() {
  return <PlatformAnalytics />;
}
