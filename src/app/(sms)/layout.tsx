"use server";
import { PropsWithChildren } from "react";
import { auth0 } from "@/lib/auth0";
import { AppShell, AppShellMain, AppShellNavbar, Box } from "@mantine/core";
import { AppNavbar } from "@/components/layout/NavBar";

export default async function Layout(props: PropsWithChildren) {
  const session = await auth0.getSession();

  if (!session) {
    // redirect to the log-in / signup page if not authenticated or make a component may be
    // or auto redirects
    return (
      <div>
        <p>
          You are not logged in. Please <a href={`/auth/login`}>login</a> to
          continue.
        </p>
      </div>
    );
  }

  return (
    <AppShell
      navbar={{ width: 250, breakpoint: "sm" }}
      padding="sm"
      layout={"alt"}
    >
      <AppShellNavbar withBorder={false} bg={"transparent"}>
        <AppNavbar />
      </AppShellNavbar>

      <AppShellMain bg={"#FAFAFA"}>
        <Box
          style={{
            width: "100%",
            height: "calc(100vh - 32px)",
            background: "white",
            border: "1px solid #ECECECCC",
            borderRadius: "var(--mantine-radius-default, 4px)",
            overflow: "auto",
          }}
        >
          {props.children}
        </Box>
      </AppShellMain>
    </AppShell>
  );
}
