import { brandTitle } from '@gitroom/helpers/utils/is.general.server.side';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: `${brandTitle()} - Agent`,
  description: '',
};

export default async function Page() {
  return redirect('/agents/new');
}
