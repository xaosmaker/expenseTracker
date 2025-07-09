import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { NavLink, useLocation } from "react-router-dom"
import Link from "@mui/material/Link"
import { z } from "zod/v4"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import { PasswordField } from "./PasswordField"



const regSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(8, "password should be at least 8 char long")
    .regex(/[A-Z]/, { message: "password should contain at least one uppercase character", abort: false })
    .regex(/[1-9]/, "password should contain at least one number")
    .regex(/[*!#$%]/, "password should contain at least one symbol [* ! # % $]"),
  confirmPassword: z.string()

}).check((data) => {
  if (data.value.password !== data.value.confirmPassword) {
    data.issues.push({
      code: "custom",
      message: "Password mismatch",
      input: data.value.password,
      path: ["confirmPassword"]
    })
  }
})




type Register = z.infer<typeof regSchema>

export default function LoginReg() {
  const { pathname } = useLocation()
  const isRegister = pathname === "/register"

  function isEmptyObject(obj: object) {
    return Object.keys(obj).length > 0
  }

  const onSubmit: SubmitHandler<Register> = (data) => {
    console.log(data);
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Register>({
    mode: "onChange",
    resolver: isRegister ? zodResolver(regSchema) : undefined

  })
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "yellow", justifyContent: "center", alignContent: "center" }}>

      <Container maxWidth="xs">
        <Paper component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
          <Typography variant="h4" sx={{ my: 2 }}>Expence Tracker</Typography>
          <Typography sx={{ my: 4, textTransform: "uppercase" }}>{isRegister ? "Register" : "Log in"}</Typography>

          <Stack direction="column" gap={"1rem"}>

            <TextField {...register("email")} variant="outlined" label="Email" error={!!errors.email} type="text" name="email" />
            {!!errors.email && <Alert severity="error"  >{errors.email?.message}</Alert>}



            <PasswordField label="Password" register={register("password")} hasError={!!errors.password} />
            {!!errors.password && <Alert severity="error"  >{errors.password?.message}</Alert>}

            {isRegister &&
              <>

                <PasswordField hasError={!!errors.confirmPassword} register={register("confirmPassword")} label="Confirm Password" />
                {!!errors.confirmPassword && <Alert severity="error"  >{errors.confirmPassword?.message}</Alert>}
              </>
            }



            <Button type="submit" disabled={isEmptyObject(errors)} variant="contained">{isRegister ? "Register" : "Log in"}</Button>


            <Divider>or</Divider>

            <Typography >
              {isRegister ? <>
                Already have an account &nbsp;
                < Link component={NavLink} to={"/login"}>Log in</Link>
              </>
                : <>
                  Don't have an account &nbsp;
                  <Link component={NavLink} to={"/register"}>Register</Link>
                </>
              }
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box >
  )
}

