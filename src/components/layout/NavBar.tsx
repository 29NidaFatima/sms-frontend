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
  Divider,
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
      px="sm"
      py="md"
      style={{
        width: 240,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
      }}
    >
      {/* Brand + Navigation */}
      <Box>
        {/* Brand */}
        <Box
          px="xs"
          py={8}
          mb="lg"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background:
              "linear-gradient(to right, rgba(13, 110, 253, 0.1), rgba(108, 117, 125, 0.05))",
            borderRadius: 8,
          }}
        >
          <ThemeIcon size={30} radius="xl" color="indigo" variant="light">
            <IconBuildingCommunity size={18} />
          </ThemeIcon>
          <Text fw={700} size="lg" c="indigo" style={{ letterSpacing: 0.5 }}>
            SMS Inc.
          </Text>
        </Box>

        {/* Main Nav */}
        <Stack gap="sm">
          <Text px="xs" size="xs" fw={600} c="gray.6" tt="uppercase" mb={2}>
            Platform
          </Text>

          <Stack gap={5}>
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = pathname === path;
              return (
                <Button
                  key={path}
                  onClick={() => router.push(path)}
                  variant="light"
                  fullWidth
                  radius="md"
                  size="sm"
                  justify="left"
                  px="xs"
                  styles={{
                    root: {
                      fontWeight: isActive ? 600 : 500,
                      backgroundColor: isActive ? "#edf2ff" : "#fff",
                      borderLeft: isActive ? "3px solid #1c7ed6" : "3px solid transparent",
                      color: "#212529",
                      transition: "background-color 0.2s ease",
                    },
                  }}
                  leftSection={
                    <ThemeIcon
                      size={20}
                      color={isActive ? "indigo" : "gray"}
                      variant="light"
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

      {/* Footer */}
      <Stack gap="xs" px="xs" mb="md">
        <Divider />

        {footerItems.map(({ label, icon: Icon, path }) => (
          <Button
            key={path}
            onClick={() => router.push(path)}
            variant="light"
            fullWidth
            radius="md"
            size="sm"
            justify="left"
            px="xs"
            styles={{
              root: {
                fontSize: "13px",
                color: "#495057",
                "&:hover": {
                  backgroundColor: "#f1f3f5",
                },
              },
            }}
            leftSection={
              <ThemeIcon size={20} color="gray" variant="light">
                <Icon size={16} />
              </ThemeIcon>
            }
          >
            {label}
          </Button>
        ))}

        {/* Signature */}
        <Box pt="sm" style={{ borderTop: "1px solid #e9ecef" }}>
          <Text size="xs" c="dimmed">
            📧 nida@example.com
          </Text>
          <Text size="xs" fw={400} c="gray.6">
            Made by Nida
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}