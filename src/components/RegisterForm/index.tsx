"use client";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import { registerAction } from "@/actions/register";
import { useTransition } from "react";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: registerProps) => {
    console.log("SUCCESS", data);
    startTransition(() => {
      registerAction(data).then((returnData: any) => {
        console.log(returnData);
      });
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            width: "55vw",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            p: 3,
          }}
        >
          <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 4 }}>
              Sign In
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Button variant="outlined" size="large" onClick={() => {}}>
                <FcGoogle />
              </Button>
              <Button variant="outlined" size="large" onClick={() => {}}>
                <FaGithub />
              </Button>
            </Box>

            <FormField
              type="text"
              placeholder="Name"
              name="name"
              register={register}
              error={errors.name}
            />

            <FormField
              type="text"
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
            />

            <FormField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
            />

            <Button
              disabled={isPending}
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontSize: "16px",
                width: "80%",
                fontWeight: "500",
                boxShadow: "none",
                mb: 4,
              }}
            >
              Register
            </Button>
            <Box>
              New user ??
              <Link href={"/auth/login"}>Sign Up</Link>
              <Button variant="contained" onClick={()=> {router.push('/auth/login')}}>Redirect to /auth/login</Button>
            </Box>
          </Stack>
        </Paper>
      </form>
    </>
  );
};
