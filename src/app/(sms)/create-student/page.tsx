"use client";

import { Flex } from "@mantine/core";
import FormLayout from "@/app/(sms)/create-student/FormLayout";

export default function CreateStudentPage() {
  return (
    <Flex style={{ height: "100vh", overflowY: "auto" }}>
      <FormLayout />
    </Flex>
  );
}
