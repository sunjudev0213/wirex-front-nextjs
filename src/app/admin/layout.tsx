'use client';

// auth
import { RoleBasedGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <RoleBasedGuard roles={['admin']} hasContent>
      <DashboardLayout>{children}</DashboardLayout>
    </RoleBasedGuard>
  );
}
