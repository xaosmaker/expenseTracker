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



const regSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})
type Register = z.infer<typeof regSchema>

export default function LoginReg() {

  const onSubmit: SubmitHandler<Register> = (data) => {
    console.log(data);

  }

  const { register, handleSubmit } = useForm<Register>({
    resolver: zodResolver(regSchema)
  })

  const { pathname } = useLocation()
  const isRegister = pathname === "/register"



  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "yellow", justifyContent: "center", alignContent: "center" }}>

      <Container maxWidth="xs">
        <Paper component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
          <Typography variant="h4" sx={{ my: 2 }}>Expence Tracker</Typography>
          <Typography sx={{ my: 4, textTransform: "uppercase" }}>{isRegister ? "Register" : "Log in"}</Typography>

          <Stack direction="column" gap={"1rem"}>

            <TextField {...register("email")} variant="outlined" label="Email" type="email" name="email" />
            <TextField {...register("password")} variant="outlined" label="Password" type="password" name="password" />

            {isRegister && <TextField variant="outlined" label="Confirm Password" type="password" name="confirmPassword" />}

            <Button type="submit" variant="contained">{isRegister ? "Register" : "Log in"}</Button>
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

