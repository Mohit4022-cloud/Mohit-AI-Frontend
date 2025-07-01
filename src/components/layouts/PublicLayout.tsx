import { PublicNavigation } from "./PublicNavigation";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavigation />
      <main>{children}</main>
    </>
  );
}
