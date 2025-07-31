import type { Metadata } from "next";
import "./styles.css"
import { Toaster } from "@/components/ui/sonner";
import { getUser } from '@/lib/getUser';
import UserProvider from "@/lib/store-provider";
import { User } from "@/payload-types";

export const metadata: Metadata = {
  title: "Saec-web",
  description: "Saec-web description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  
  // Cast the user to match the expected type
  const typedUser = user as (User | null | any);

  return (
    <html lang="en">
      <body className="bg-basebackground">
        <UserProvider user={typedUser}>
          {children}
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
