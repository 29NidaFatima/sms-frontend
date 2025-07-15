"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Notification,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconUser } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useCreate } from "@/hooks/useCreate";
import { studentSchema } from "../../../../lib/schema";
import { useEffect } from "react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { z } from "zod";

type IFormValues = z.infer<typeof studentSchema>;

export default function FormLayout() {
  const mutation = useCreate<IFormValues>({
    resource: "/student",
    useFormData: true,
  });

  const form = useForm<IFormValues>({
    validate: zod4Resolver(studentSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      sectionId: "1",
      gender: "Male",
      adhaarNumber: "",
      address: "",
      fatherName: "",
      motherName: "",
      parentEmail: "",
      parentPhone: "",
      altParentPhone: "",
      academicYearId: "1",
      photoFile: [] as File[],
      adhaarFile: [] as File[],
      dateOfBirthFile: [] as File[],
      admissionNumber: "",
      guardianName: "",
      guardianPhoneNumber: "",
      admissionDate: null,
      udiceSynced: true,
      penNumber: "",
      admissionFee: 0,
    },
  });

  useEffect(() => {
    console.log("Form Values:", JSON.stringify(form.values, null, 2));
  }, [form.values]);

  return (
    <Box style={{ flex: 1, height: "100vh", overflowY: "scroll" }}>
      <Container py="xl">
        <Paper p="md" shadow="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group>
              <IconUser size={24} stroke={1.5} />
              <Title order={3}>Students</Title>
            </Group>
            <Group>
              <Select
                placeholder="2024–2025"
                data={["1", "2", "3"]}
                style={{ width: "160px" }}
                {...form.getInputProps("academicYearId")}
              />
              <Button size="sm" style={{ width: "140px" }}>
                Quick Create
              </Button>
            </Group>
          </Group>

          <form
            onSubmit={form.onSubmit((values) => {
              const errors: Record<string, string> = {};

              if (!values.dateOfBirth || isNaN(values.dateOfBirth.getTime())) {
                errors.dateOfBirth = "Valid date of birth is required";
              }
              if (
                !values.admissionDate ||
                isNaN(values.admissionDate.getTime())
              ) {
                errors.admissionDate = "Valid admission date is required";
              }
              if (
                !values.photoFile?.length ||
                !(values.photoFile[0] instanceof File)
              ) {
                errors.photoFile = "Valid student photo is required";
              }
              if (
                !values.adhaarFile?.length ||
                !(values.adhaarFile[0] instanceof File)
              ) {
                errors.adhaarFile = "Valid Aadhar file is required";
              }
              if (
                !values.dateOfBirthFile?.length ||
                !(values.dateOfBirthFile[0] instanceof File)
              ) {
                errors.dateOfBirthFile = "Valid DOB proof file is required";
              }

              if (Object.keys(errors).length > 0) {
                form.setErrors(errors);
                return;
              }

              mutation.mutate(values);
            })}
          >
            <Stack gap="md">
              {/* Student Details */}
              <Title order={6} ta="center" mb={0}>
                Student Details
              </Title>
              <Paper p="md" shadow="xs" withBorder>
                <Flex gap="md">
                  <Box w="30%">
                    <Title order={6} ta="center" mb="sm">
                      Student Photo
                    </Title>
                    <Dropzone
                      onDrop={(files) => {
                        const validFiles = files.filter(
                          (f) => f instanceof File,
                        );
                        form.setFieldValue("photoFile", validFiles);
                        form.clearFieldError("photoFile");
                      }}
                      maxFiles={1}
                      accept={[
                        "image/png",
                        "image/jpeg",
                        "image/svg+xml",
                        "image/gif",
                      ]}
                      style={{
                        height: 160,
                        backgroundColor: "#f8f9fa",
                        borderRadius: 8,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box bg="#f1f3f5" p="sm">
                        <IconUpload size={30} stroke={1.5} />
                      </Box>
                      <Text mt="sm" ta="center">
                        <strong>Click to upload</strong> or drag and drop
                      </Text>
                      {form.errors.photoFile && (
                        <Text c="red">{form.errors.photoFile}</Text>
                      )}
                    </Dropzone>
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Grid gutter="md">
                      <GridCol span={4}>
                        <TextInput
                          label="First Name"
                          required
                          {...form.getInputProps("firstName")}
                        />
                      </GridCol>
                      <GridCol span={4}>
                        <TextInput
                          label="Last Name"
                          required
                          {...form.getInputProps("lastName")}
                        />
                      </GridCol>
                      <GridCol span={4}>
                        <DateInput
                          label="Date of Birth"
                          required
                          value={form.values.dateOfBirth}
                          onChange={(value) =>
                            form.setFieldValue(
                              "dateOfBirth",
                              value ? new Date(value) : null,
                            )
                          }
                          error={form.errors.dateOfBirth}
                        />
                      </GridCol>
                      <GridCol span={4}>
                        <Select
                          label="Section"
                          required
                          data={["1", "2", "3"]}
                          {...form.getInputProps("sectionId")}
                        />
                      </GridCol>
                      <GridCol span={4}>
                        <Select
                          label="Gender"
                          required
                          data={["Male", "Female", "Other"]}
                          {...form.getInputProps("gender")}
                        />
                      </GridCol>
                      <GridCol span={5}>
                        <TextInput
                          label="Aadhar Number"
                          required
                          {...form.getInputProps("adhaarNumber")}
                        />
                      </GridCol>
                      <GridCol span={5}>
                        <TextInput
                          label="Address"
                          required
                          {...form.getInputProps("address")}
                        />
                      </GridCol>
                    </Grid>
                  </Box>
                </Flex>
              </Paper>

              {/* File Uploads */}
              <Paper p="md" shadow="xs" withBorder>
                <Title order={6}>Upload Aadhar & DOB Proof</Title>
                <Flex gap="md">
                  <Box w="50%">
                    <Dropzone
                      onDrop={(files) => {
                        const validFiles = files.filter(
                          (f) => f instanceof File,
                        );
                        form.setFieldValue("adhaarFile", validFiles);
                        form.clearFieldError("adhaarFile");
                      }}
                      maxFiles={1}
                      accept={["application/pdf", "image/png", "image/jpeg"]}
                    >
                      <Text>Aadhar File (PDF/Image)</Text>
                      {form.errors.adhaarFile && (
                        <Text c="red">{form.errors.adhaarFile}</Text>
                      )}
                    </Dropzone>
                  </Box>
                  <Box w="50%">
                    <Dropzone
                      onDrop={(files) => {
                        const validFiles = files.filter(
                          (f) => f instanceof File,
                        );
                        form.setFieldValue("dateOfBirthFile", validFiles);
                        form.clearFieldError("dateOfBirthFile");
                      }}
                      maxFiles={1}
                      accept={["application/pdf", "image/png", "image/jpeg"]}
                    >
                      <Text>DOB Proof File (PDF/Image)</Text>
                      {form.errors.dateOfBirthFile && (
                        <Text c="red">{form.errors.dateOfBirthFile}</Text>
                      )}
                    </Dropzone>
                  </Box>
                </Flex>
              </Paper>

              {/* Parent Details */}
              <Paper p="md" shadow="xs" withBorder>
                <Title order={6}>Parent Details</Title>
                <Grid gutter="md">
                  <GridCol span={4}>
                    <TextInput
                      label="Father Name"
                      required
                      {...form.getInputProps("fatherName")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Mother Name"
                      required
                      {...form.getInputProps("motherName")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Email"
                      type="email"
                      required
                      {...form.getInputProps("parentEmail")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Parent Phone"
                      required
                      {...form.getInputProps("parentPhone")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Alternate Phone"
                      required
                      {...form.getInputProps("altParentPhone")}
                    />
                  </GridCol>
                </Grid>
              </Paper>

              {/* Emergency Details */}
              <Paper p="md" shadow="xs" withBorder>
                <Title order={6}>Emergency Details</Title>
                <Grid gutter="md">
                  <GridCol span={4}>
                    <TextInput
                      label="Guardian Name"
                      required
                      {...form.getInputProps("guardianName")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Guardian Phone Number"
                      required
                      {...form.getInputProps("guardianPhoneNumber")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <DateInput
                      label="Admission Date"
                      required
                      value={form.values.admissionDate}
                      onChange={(value) =>
                        form.setFieldValue(
                          "admissionDate",
                          value ? new Date(value) : null,
                        )
                      }
                      error={form.errors.admissionDate}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Admission Fee"
                      type="number"
                      required
                      {...form.getInputProps("admissionFee")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="PEN Number (optional)"
                      {...form.getInputProps("penNumber")}
                    />
                  </GridCol>
                </Grid>
              </Paper>

              {/* Admission Number */}
              <Paper p="md" shadow="xs" withBorder>
                <TextInput
                  label="Admission Number"
                  placeholder="Enter admission number"
                  required
                  {...form.getInputProps("admissionNumber")}
                />
              </Paper>

              {/* Submit */}
              <Flex justify="flex-end">
                <Button type="submit" size="sm" style={{ width: "120px" }}>
                  Save
                </Button>
              </Flex>

              {mutation.isSuccess && (
                <Notification color="green" title="Success">
                  Form submitted!
                </Notification>
              )}
              {mutation.isError && (
                <Notification color="red" title="Error">
                  Submission failed:{" "}
                  {mutation.error?.message || "Unknown error"}
                </Notification>
              )}
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
