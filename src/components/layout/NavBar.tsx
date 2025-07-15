"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Stack,
  Text,
  ThemeIcon,
  Group,
} from "@mantine/core";
import {
  IconLayoutDashboard,
  IconUserPlus,
  IconUsers,
  IconTrain,
  IconCurrencyRupee,
  IconMessage,
  IconHelp,
  IconBuildingCommunity,
} from "@tabler/icons-react";

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", icon: IconLayoutDashboard, path: "/sms" },
    { label: "Create Student", icon: IconUserPlus, path: "/create-student" },
    { label: "Students", icon: IconUsers, path: "/sms/student" },
    { label: "Classes", icon: IconTrain, path: "/sms/classes" },
    { label: "Fee Registry", icon: IconCurrencyRupee, path: "/sms/fees" },
  ];

  const footerItems = [
    { label: "Support", icon: IconHelp, path: "/support" },
    { label: "Feedback", icon: IconMessage, path: "/feedback" },
  ];

  return (
    <Box
      py="xs"
      pl="xs"
      style={{
        width: 240,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      {/* Top Section */}
      <Box>
        {/* Brand */}
        <Button
          size="lg"
          px="xs"
          fullWidth
          justify="left"
          variant="subtle"
          radius="md"
          component={Link}
          href="/"
        >
          <Group>
            <ThemeIcon size={24} radius="xl" variant="light" color="black">
              <IconBuildingCommunity size={16} />
            </ThemeIcon>
            <Text fw={700} size="lg" c="black">
              SMS Inc.
            </Text>
          </Group>
        </Button>

        {/* Navigation */}
        <Stack mt="xl" gap="xs">
          <Text px="xs" size="sm" fw={600} c="black">
            Platform
          </Text>

          <Stack gap={4}>
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = pathname === path;
              return (
                <Button
                  key={path}
                  onClick={() => router.push(path)}
                  variant="subtle"
                  fullWidth
                  justify="left"
                  radius="md"
                  size="sm"
                  px="xs"
                  style={{
                    fontWeight: 500,
                    backgroundColor: isActive ? "#000" : undefined,
                    color: isActive ? "white" : "black",
                  }}
                  leftSection={
                    <ThemeIcon
                      size={20}
                      variant="light"
                      color={isActive ? "white" : "black"}
                    >
                      <Icon size={16} />
                    </ThemeIcon>
                  }
                >
                  {label}
                </Button>
              );
            })}
          </Stack>
        </Stack>
      </Box>

      {/* Bottom Section */}
      <Stack gap={4} px="xs" mb="xs">
        {footerItems.map(({ label, icon: Icon, path }) => (
          <Button
            key={path}
            onClick={() => router.push(path)}
            variant="subtle"
            fullWidth
            justify="left"
            radius="md"
            size="sm"
            style={{ color: "black" }}
            leftSection={
              <ThemeIcon size={20} variant="light" color="black">
                <Icon size={16} />
              </ThemeIcon>
            }
          >
            {label}
          </Button>
        ))}

        {/* Signature Block */}
        <Box pt="sm" style={{ borderTop: "1px solid #e9ecef" }}>
          <Text size="xs" c="dimmed">
            📧 nida@example.com
          </Text>
          <Text size="xs" fw={500}>
            Made by Nida
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}