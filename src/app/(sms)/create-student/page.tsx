"use client";

import { Flex } from "@mantine/core";
import FormLayout from "@/app/(sms)/create-student/components/FormLayout";

export default function CreateStudentPage() {
  return (
    <Flex style={{ height: "100vh" }}>
      <FormLayout />
    </Flex>
  );
}
