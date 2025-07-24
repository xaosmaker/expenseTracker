import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm, Controller } from "react-hook-form";
import { paymentSchema, type CreatePayment, type Payment, type PaymentSchema } from "../types/paymentTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateToYMD, isFormContainsErrors } from "../../../helpers/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPayment, getSinglePaymentApi, putSinglePaymentApi } from "../services/paymentServices";
import { useEffect } from "react";

//TODO: i will make it so it can update and the data so it will be create update

export default function CreatePayment() {
  const navigate = useNavigate()
  const { control: formControl, setValue, register, handleSubmit, formState: { errors } } = useForm<PaymentSchema>({
    mode: "onChange",
    defaultValues: {
      isPayed: false
    },
    resolver: zodResolver(paymentSchema),
  })
  const { paymentId } = useParams<{ paymentId: string }>()

  const { data } = useQuery<Payment>({ enabled: !!paymentId, queryKey: ["singlePayment", paymentId], queryFn: () => getSinglePaymentApi(paymentId!) })


  useEffect(() => {
    if (data) {
      setValue("payedDueDate", dateToYMD(data.payedDueDate))
      setValue("isPayed", data.isPayed)
      setValue("name", data.name)
      setValue("amount", data.amount)
    }
  })


  function submitForm(data: PaymentSchema) {
    const dataNew: Omit<Payment, "createdAt" | "updatedAt" | "userId"> = { ...data, payedDueDate: dateToYMD(data.payedDueDate), id: -1 }
    if (paymentId) {
      dataNew.id = Number(paymentId)
    }



    mutate(dataNew)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: paymentId ? (data: Omit<Payment, "createdAt" | "updatedAt" | "userId">) => putSinglePaymentApi(paymentId, data) : createPayment,
    onError: (e) => console.log("useMutation CreatePayment:", e),
    onSuccess: () => navigate("/payments")
  })


  return (

    <Container maxWidth="xs">
      <Paper component={'form'} onSubmit={handleSubmit(submitForm)} sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ my: 2 }}>{paymentId ? "Update Payment" : "Create Payment"}</Typography>

        <Stack direction="column" gap={"1rem"}>

          <TextField variant="outlined" {...register("name")} label="Name" error={!!errors.name} type="text" />
          {errors.name && <Alert severity="error"  >{errors.name.message}</Alert>}

          <TextField variant="outlined" {...register("payedDueDate")} label="Payement Due Date" slotProps={{ inputLabel: { shrink: true } }} error={!!errors.payedDueDate} type="date" />
          {errors.payedDueDate && <Alert severity="error"  >{errors.payedDueDate.message}</Alert>}

          <TextField variant="outlined" label="amount" {...register("amount")} slotProps={{ inputLabel: { shrink: true } }} error={!!errors.amount} type="number" />
          {errors.amount && <Alert severity="error"  >{errors.amount.message}</Alert>}

          <Controller
            name="isPayed"
            control={formControl}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} {...field} />}
                label="is payed"
              />
            )
            }
          />

          <Button type="submit" disabled={!isFormContainsErrors(errors)} loading={isPending} variant="contained">{paymentId ? "Update" : "Create"}</Button>
        </Stack>
      </Paper>
    </Container>
  )
}

