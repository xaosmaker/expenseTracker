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
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import { PasswordField } from "../../components/PasswordField"
import { regSchema, type RegisterUser } from "../schemas/regSchema"
import { loginUser, registerUser } from "../services/userServices"
import { AxiosError } from "axios"
import { isFormContainsErrors } from "../../helpers/utils"
import { useNavigate } from "react-router-dom"








export default function LoginReg() {
  const { pathname } = useLocation()
  const isRegister = pathname === "/register"
  const navigate = useNavigate()


  const onSubmit: SubmitHandler<RegisterUser> = async (formData) => {
    try {
      if (isRegister) {
        const res = await registerUser(formData)
        if (res.email === formData.email) {
          navigate("/login")

        }
        return
      }
      const res = await loginUser(formData)
      navigate("/payments")
      console.log(res);



    } catch (e) {
      if (e instanceof AxiosError) {
        setError("root", {
          message: e.response?.data.message || "Something went Wrong Try again later"
        })
        return
      }
      console.log(3, e);
    }
  }


  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterUser>({
    mode: "onChange",
    resolver: isRegister ? zodResolver(regSchema) : undefined
  })

  return (
    <Box sx={{ minHeight: "100vh", justifyContent: "center", alignContent: "center" }}>

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



            <Button type="submit" disabled={!isFormContainsErrors(errors)} loading={isSubmitting} variant="contained">{isRegister ? "Register" : "Log in"}</Button>

            {!!errors.root && <Alert severity="error"  >{errors.root?.message}</Alert>}

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

