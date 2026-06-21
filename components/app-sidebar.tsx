"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscriptions";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export const menuItems = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        url: "/workflows",
        icon: FolderOpenIcon,
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { hasActiveSubscriptions, isLoading } = useHasActiveSubscription();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="gap-x-4 px-4 h-10">
              <Link href={"/workflows"} prefetch>
                <Image
                  src={"/logos/logo.svg"}
                  alt="Nodebase"
                  width={30}
                  height={30}
                />
                <span className="font-semibold text-sm">Nodebase</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 px-4 h-10"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscriptions && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={"Upgrade to Pro"}
                className="gap-x-4 px-4 h-10"
                onClick={() => authClient.checkout({ slug: "pro" })}
              >
                <StarIcon />
                Upgrade to Pro
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Billing Portal"}
              className="gap-x-4 px-4 h-10"
              onClick={() => authClient.customer.portal()}
            >
              <CreditCardIcon />
              Billing Portal
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Sign Out"}
              className="gap-x-4 px-4 h-10"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
            >
              <LogOutIcon />
              Sign Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
