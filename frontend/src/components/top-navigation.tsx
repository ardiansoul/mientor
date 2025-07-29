"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";

export function TopNavigation() {
  const { isAuth } = useAuth();
  return (
    <section className="w-full flex border-2 border-black ">
      <div>
        <Button variant="link">
          <img src="/images/logo.png" className="w-24 h-24" />
        </Button>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {isAuth ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/auth/login">login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : null}
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}
