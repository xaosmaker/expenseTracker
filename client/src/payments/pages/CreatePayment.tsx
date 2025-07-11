import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm, Controller } from "react-hook-form";

//TODO: basic form to use for create payment i work on this and change the data later
//i will make it so it can update and the data

export default function CreatePayment() {
  const { control } = useForm({
    defaultValues: {
      bool: true
    }
  })


  return (

    <Container maxWidth="xs">
      <Paper component={'form'} sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ my: 2 }}>Expence Tracker</Typography>
        <Typography sx={{ my: 4, textTransform: "uppercase" }}>Register</Typography>

        <Stack direction="column" gap={"1rem"}>

          <TextField variant="outlined" label="Name" error={true} type="text" />
          <Alert severity="error"  >Name error</Alert>

          <TextField variant="outlined" label="Payement Due Date" slotProps={{ inputLabel: { shrink: true } }} error={true} type="date" />
          <Alert severity="error"  >Payment error</Alert>

          <TextField variant="outlined" label="amount" slotProps={{ inputLabel: { shrink: true } }} error={true} type="number" />
          <Alert severity="error"  >Amount error</Alert>

          <Controller
            name="bool"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="bool"
              />
            )}
          />
          <Alert severity="error"  >Amount error</Alert>

          <Button type="submit" disabled={false} loading={false} variant="contained"> Register</Button>

          <Alert severity="error"  >General Error</Alert>

          <Divider>or</Divider>

          <Typography >
            <>
              Already have an account &nbsp;
              < Link component={NavLink} to={"/login"}>Log in</Link>
            </>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  )
}

