import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getUserMeApi } from "../services/userServices";
import type { User } from "../types/User";
import { dateToYMD } from "../../../helpers/utils";



export default function UserMe() {
  const { data } = useQuery<User>({ queryKey: ["me"], queryFn: getUserMeApi })


  const { register } = useForm<Omit<User, "id" | "createdAt" | "updatedAt">>({
    values: data
  })


  return (
    <>
      {/* <Box sx={{ paddingTop: "4rem", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}> */}
      {/*   <Avatar sx={{ height: 300, width: 300 }} src="https://drosinakis.com/ZTS03058.jpg" alt="test" /> */}
      {/*   <Box sx={{ paddingTop: "4rem" }}> */}
      {/**/}
      {/*     <Button>Update Photo</Button> */}
      {/*     <Button>Delete Photo</Button> */}
      {/*   </Box> */}
      {/* </Box> */}
      <Container component={"form"} maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        <TextField {...register("email")} slotProps={{ inputLabel: { shrink: true } }} disabled label="email"></TextField>
        <TextField disabled {...register("password")} slotProps={{ inputLabel: { shrink: true } }} label="password" />
        {data && <>
          <Box sx={{ display: "flex", gap: 2 }}>

            <TextField type="date" disabled slotProps={{ inputLabel: { shrink: true } }} sx={{ flex: 1, }} value={dateToYMD(data?.createdAt) || ""} label="created"></TextField>
            <TextField type="date" disabled slotProps={{ inputLabel: { shrink: true } }} sx={{ flex: 1, }} value={dateToYMD(data?.updatedAt) || ""} label="updated"></TextField>
          </Box>
        </>}

        {/* <Button>Change Email</Button> */}
        {/* <Button>Change Password</Button> */}
        {/* <Button>Edit</Button> */}

      </Container>
    </>
  )
}

