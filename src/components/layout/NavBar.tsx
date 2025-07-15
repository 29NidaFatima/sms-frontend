"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, Stack, Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";

const routes = [
  { label: "🍔 Dashboard", path: "/sms" },
  { label: "🎈 Students", path: "/sms/student" },
  { label: "🚄 Classes", path: "/sms/classes" },
  { label: "💸 Fee Registry", path: "/sms/fees" },
  { label: "Create Student", path: "/create-student" },
];

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <Box py="xs" pl="xs">
      <Button size="lg" px="xs" fullWidth justify="left" variant="subtle">
        <MantineLogo style={{ width: 120 }} />
      </Button>

      <Stack mt="xl" justify="left">
        <Text px="xs" size="sm" fw={600} c="gray">
          Platform
        </Text>

        <Stack gap={2}>
          {routes.map(({ label, path }) => (
            <Button
              key={path}
              justify="left"
              px="xs"
              fullWidth
              variant={activePath === path ? "filled" : "subtle"}
              color={activePath === path ? "dark" : "gray"}
              onClick={() => router.push(path)}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
