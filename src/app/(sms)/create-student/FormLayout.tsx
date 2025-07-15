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
import { DateInput } from "@mantine/dates";
import { IconPhoto, IconUpload, IconUser } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { z } from "zod";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useCreate } from "@/hooks/useCreate";
import { studentSchema } from "../../../lib/schema";

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
      photoFile: [],
      adhaarFile: [],
      dateOfBirthFile: [],
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
    <Box style={{ flex: 1, height: "100vh", overflowY: "auto" }}>
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
                style={{ width: 160 }}
                {...form.getInputProps("academicYearId")}
              />
              <Button size="sm" style={{ width: 140 }}>
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
              if (!values.photoFile?.[0] || !(values.photoFile[0] instanceof File)) {
                errors.photoFile = "Valid student photo is required";
              }
              if (!values.adhaarFile?.[0] || !(values.adhaarFile[0] instanceof File)) {
                errors.adhaarFile = "Valid Aadhar file is required";
              }
              if (!values.dateOfBirthFile?.[0] || !(values.dateOfBirthFile[0] instanceof File)) {
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
              <Title order={6} ta="center" mb="md">
                Student Details
              </Title>

              <Flex gap="md" align="start">
                {/* LEFT */}
                <Paper p="md" shadow="xs" withBorder bg="#f8f9fa">
                  <Box w="100%" h={200}>
                    <Dropzone
                      onDrop={(files) => {
                        const validFiles = files.filter((f) => f instanceof File);
                        form.setFieldValue("photoFile", validFiles);
                        form.clearFieldError("photoFile");
                      }}
                      maxFiles={1}
                      accept={["image/png", "image/jpeg", "image/svg+xml", "image/gif"]}
                      style={{
                        height: "100%",
                        borderRadius: 8,
                        backgroundColor: "#f8f9fa",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Box mb="sm">
                        <IconPhoto size={30} stroke={1.5} />
                      </Box>
                      <Text size="sm" ta="center">
                        <strong>Click to upload</strong>{" "}
                        <Text span c="dimmed">
                          or drag and drop
                          <br />
                          SVG, PNG, JPG or GIF (max. 800×400px)
                        </Text>
                      </Text>
                      {form.errors.photoFile && (
                        <Text c="red" size="sm">
                          {form.errors.photoFile}
                        </Text>
                      )}
                    </Dropzone>
                  </Box>
                </Paper>

                {/* RIGHT */}
                <Box w="70%">
                  <Paper p="md" shadow="xs" withBorder>
                    <Grid gutter="md">
                      <GridCol span={4}>
                        <TextInput
                          label="First Name"
                          placeholder="Enter"
                          required
                          {...form.getInputProps("firstName")}
                        />
                      </GridCol>
                      <GridCol span={4}>
                        <TextInput
                          label="Last Name"
                          placeholder="Enter"
                          required
                          {...form.getInputProps("lastName")}
                        />
                      </GridCol>
                      <GridCol span={4}>
                        <DateInput
                          label="Date of Birth"
                          placeholder="Enter"
                          required
                          value={form.values.dateOfBirth}
                          onChange={(value) =>
                            form.setFieldValue("dateOfBirth", value ? new Date(value) : null)
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
                      <GridCol span={4}>
                        <TextInput
                          label="Aadhar Number"
                          placeholder="Enter"
                          required
                          {...form.getInputProps("adhaarNumber")}
                        />
                      </GridCol>

                      <GridCol span={4}>
                        <TextInput
                          label="Address"
                          placeholder="Enter"
                          required
                          {...form.getInputProps("address")}
                        />
                      </GridCol>
                      <GridCol span={4}>
                        <Dropzone
                          onDrop={(files) => {
                            const validFiles = files.filter((f) => f instanceof File);
                            form.setFieldValue("adhaarFile", validFiles);
                            form.clearFieldError("adhaarFile");
                          }}
                          maxFiles={1}
                          accept={["application/pdf", "image/png", "image/jpeg"]}
                          style={{
                            height: 90,
                            borderRadius: 6,
                            backgroundColor: "#f8f9fa",
                            padding: 8,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Box>
                            <Text size="sm" fw={500}>Aadhar File</Text>
                            <Text size="xs" c="dimmed">PDF or Image (PNG, JPG)</Text>
                          </Box>
                          {form.errors.adhaarFile && (
                            <Text c="red" size="xs">
                              {form.errors.adhaarFile}
                            </Text>
                          )}
                        </Dropzone>
                      </GridCol>
                      <GridCol span={4}>
                        <Dropzone
                          onDrop={(files) => {
                            const validFiles = files.filter((f) => f instanceof File);
                            form.setFieldValue("dateOfBirthFile", validFiles);
                            form.clearFieldError("dateOfBirthFile");
                          }}
                          maxFiles={1}
                          accept={["application/pdf", "image/png", "image/jpeg"]}
                          style={{
                            height: 90,
                            borderRadius: 6,
                            backgroundColor: "#f8f9fa",
                            padding: 8,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Box>
                            <Text size="sm" fw={500} mb={2}>
                              DOB Proof
                            </Text>
                            <Text size="xs" c="dimmed">
                              Upload as PDF or Image (PNG, JPG)
                            </Text>
                          </Box>

                          {form.errors.dateOfBirthFile && (
                            <Text c="red" size="xs">
                              {form.errors.dateOfBirthFile}
                            </Text>
                          )}
                        </Dropzone>
                      </GridCol>
                    </Grid>
                  </Paper>
                </Box>
              </Flex>

              {/* Parent Details */}
              <Title order={6}>Parent Details</Title>
              <Paper p="md" shadow="xs" withBorder>
                <Grid gutter="md">
                  <GridCol span={4}>
                    <TextInput
                      label="Father Name"
                      placeholder="Enter"
                      required
                      {...form.getInputProps("fatherName")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Mother Name"
                      placeholder="Enter"
                      required
                      {...form.getInputProps("motherName")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Email"
                      placeholder="Enter"
                      type="email"
                      required
                      {...form.getInputProps("parentEmail")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Parent Phone"
                      placeholder="Enter"
                      required
                      {...form.getInputProps("parentPhone")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Alternate Phone"
                      placeholder="Enter"
                      required
                      {...form.getInputProps("altParentPhone")}
                    />
                  </GridCol>
                </Grid>
              </Paper>

              {/* Emergency Details */}
              <Title order={6}>Emergency Details</Title>
              <Paper p="md" shadow="xs" withBorder>
                <Grid gutter="md">
                  <GridCol span={4}>
                    <TextInput
                      label="Guardian Name"
                      placeholder="Enter"
                      required
                      {...form.getInputProps("guardianName")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Guardian Phone Number"
                      placeholder="Enter"
                      required
                      {...form.getInputProps("guardianPhoneNumber")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Admission Number"
                      placeholder="Enter"
                      required
                      {...form.getInputProps("admissionNumber")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <DateInput
                      label="Admission Date"
                      placeholder="Enter"
                      required
                      value={form.values.admissionDate}
                      onChange={(value) =>
                        form.setFieldValue("admissionDate", value ? new Date(value) : null)
                      }
                      error={form.errors.admissionDate}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="Admission Fee"
                      placeholder="Enter"
                      type="number"
                      required
                      {...form.getInputProps("admissionFee")}
                    />
                  </GridCol>
                  <GridCol span={4}>
                    <TextInput
                      label="PEN Number (optional)"
                      placeholder="Enter"
                      {...form.getInputProps("penNumber")}
                    />
                  </GridCol>
                </Grid>
              </Paper>

              {/* Submit Button & Notifications */}
              <Flex justify="flex-end">
                <Button type="submit" size="sm" style={{ width: 120 }}>
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
                  Submission failed: {mutation.error?.message || "Unknown error"}
                </Notification>
              )}
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
