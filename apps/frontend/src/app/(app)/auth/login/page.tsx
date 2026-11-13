export const dynamic = 'force-dynamic';
import { Login } from '@gitroom/frontend/components/auth/login';
import { Metadata } from 'next';
import { brandTitle } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${brandTitle()} Login`,
  description: '',
};
export default async function Auth() {
  return <Login />;
}
