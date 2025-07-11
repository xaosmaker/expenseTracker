import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useState } from "react"

export function DeleteModal(name: boolean, amount: boolean, action: () => void) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  function setState() {
    setIsOpen(b => !b)
  }
  const closeModal = () => setIsOpen(false)



  return (
    <>
      <Button onClick={setState} type="button"  > Open Modal</Button>
      <Modal
        open={isOpen}
        onClose={closeModal}>
        <div className="flex flex-col justify-center items-center h-full ">

          <Paper sx={{ width: "50%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 }}>
            <Alert variant="filled" severity="error" onClose={closeModal}>
              Delete Item
            </Alert>

            <Typography sx={{ px: 2 }}> Are you sure you want to delete <span>name</span> <span> amount</span></Typography>


            <Divider />
            <div className="flex justify-between px-4">
              <Button type="button" variant="outlined" onClick={closeModal}>Cancel</Button>
              <Button type="button" color="error" variant="contained" >Delete</Button>

            </div>
            <Divider />
          </Paper>
        </div>
      </Modal>

    </>
  )
}

