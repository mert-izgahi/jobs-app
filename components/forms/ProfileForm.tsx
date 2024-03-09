"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { profileInputSchema } from "@/lib/validations";
import {
    ActionIcon,
    Avatar,
    Box,
    Button,
    Flex,
    Select,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import { IoImage } from "react-icons/io5";
import useUpdateProfile from "@/hooks/useUpdateProfile";

function ProfileForm() {
    const { currentUser, isLoadingCurrentUser } = useCurrentUser();
    const form = useForm<z.infer<typeof profileInputSchema>>({
        initialValues: {
            name: "",
            email: "",
            image: "",
            bio: "",
            role: "",
        },
        validate: zodResolver(profileInputSchema),
    });

    useEffect(() => {
        if (currentUser) {
            form.setValues({
                name: currentUser?.name || "",
                email: currentUser?.email || "",
                image: currentUser?.image || "",
                bio: currentUser?.bio || "",
                role: currentUser?.role || "",
            });
        }
    }, [currentUser]);
    const { updateProfile, isLoadingUpdateProfile } = useUpdateProfile();
    const onSubmit = async (values: z.infer<typeof profileInputSchema>) => {
        await updateProfile(values);
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)} autoComplete="off" noValidate>
            <Stack>
                <Avatar src={currentUser?.image} size={"lg"} radius={"xs"} />
                <TextInput
                    label="Name"
                    placeholder="Your name"
                    {...form.getInputProps("name")}
                />
                <Select
                    label="Role"
                    placeholder="Your role"
                    allowDeselect={false}
                    data={[
                        { value: "FREELANCER", label: "Freelancer" },
                        { value: "EMPLOYER", label: "Employer" },
                    ]}
                    {...form.getInputProps("role")}
                />
                <TextInput
                    label="Email"
                    placeholder="Your email"
                    {...form.getInputProps("email")}
                />

                <Textarea
                    label="Bio"
                    rows={5}
                    placeholder="Your bio"
                    {...form.getInputProps("bio")}
                />

                <Button
                    loading={isLoadingUpdateProfile}
                    disabled={isLoadingUpdateProfile}
                    type="submit"
                >
                    Save Changes
                </Button>
            </Stack>
        </form>
    );
}

export default ProfileForm;
