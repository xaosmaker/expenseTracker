import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import type { UseFormRegisterReturn } from 'react-hook-form';

export function PasswordField({ label, register, hasError, disabled = false }: { label: string, register: UseFormRegisterReturn, hasError: boolean, disabled?: boolean }) {

  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const setPasswordVisible = () => {
    setPasswordIsVisible(bool => !bool)
  }
  return (
    <TextField {...register}
      disabled={disabled}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={setPasswordVisible}>
              {passwordIsVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      }} variant="outlined" label={label} error={hasError} type={passwordIsVisible ? "text" : "password"} />
  )
}
