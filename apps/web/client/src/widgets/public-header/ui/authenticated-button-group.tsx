import { Button } from '@packages/ui/components/button';
import Link from 'next/link';

import { SignOutButton } from '$features/auth/sign-out';
import { ThemeToggleButton } from '$features/theme';

export function AuthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <ThemeToggleButton />

      <SignOutButton />

      <Button asChild>
        <Link href={'/dashboard'}>Dashboard</Link>
      </Button>
    </div>
  );
}
