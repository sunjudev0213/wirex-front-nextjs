'use client';

// auth
import { AuthGuard } from 'src/auth/guard';
// components
import MainLayout from 'src/layouts/main/layout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
