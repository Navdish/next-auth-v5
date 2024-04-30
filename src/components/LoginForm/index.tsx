"use client";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
// import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import { login, loginGithub } from "@/actions/login";
import {useTransition} from 'react'
import { useRouter } from "next/navigation";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
    const router = useRouter();
    const [isPending , startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginProps) => {
    console.log("SUCCESS", data);
    startTransition(()=> {
        login(data)
        // .then((returnData:any)=> {
        //     console.log("returnData",returnData);
        // })
    })
  };

  const navigator = () => {
    router.push('/auth/register')
  }

  // provider :  "github"
  const onClick = () => {
    
    startTransition(()=> {
      loginGithub("github")
  })
  }
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
              {/* <Button variant="outlined"  size="large" onClick={() => {onClick("google")}}>
                <FcGoogle />
              </Button> */}
              <Button variant="outlined" size="large" onClick={() => {onClick()}}>
                <FaGithub />
              </Button>
            </Box>

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
              Sign In
            </Button>
            <Box>
              New user ?? 
              <Link href={"/auth/register"}> Sign Up </Link>
              <Button variant="contained" onClick={()=> navigator()}>Redirect to /auth/register</Button>
            </Box>
          </Stack>
        </Paper>
      </form>

    </>
  );
};
