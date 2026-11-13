export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { AfterActivate } from '@gitroom/frontend/components/auth/after.activate';
import { brandTitle } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${
    brandTitle()
  } - Activate your account`,
  description: '',
};
export default async function Auth() {
  return <AfterActivate />;
}
