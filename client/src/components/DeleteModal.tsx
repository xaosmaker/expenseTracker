import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useMutation, type MutationFunction } from "@tanstack/react-query"
import { createContext, useState, type FormEvent } from "react"
import { queryClient } from "../queryClient"

interface DeleteOptions {
  id: number
  isOpen: boolean
  name: string
  text: string
  deleteFunction: MutationFunction<unknown, number>
}
type ShowModal = ({ id, name, text, deleteFunction }: Omit<DeleteOptions, "isOpen">) => void

const DeleteModalContext = createContext<ShowModal | undefined>(undefined)

function DeleteModal({ children }: { children: React.ReactNode }) {

  const [modalProps, setModalProps] = useState<DeleteOptions>({ isOpen: false, id: 0, name: "", text: "", deleteFunction: () => new Promise(() => { }) })
  const closeModal = () => setModalProps({ ...modalProps, isOpen: false })
  const showModal: ShowModal = ({ id, name, text, deleteFunction }) => setModalProps({ id, name, text, deleteFunction, isOpen: true })

  const { mutate } = useMutation({ mutationFn: (id: number) => modalProps.deleteFunction(id) })


  function deleteSubmit(e: FormEvent) {
    e.preventDefault()

    mutate(modalProps.id, {
      onSuccess: () => {
        closeModal()
        queryClient.refetchQueries({ queryKey: ["payments"] })
      }
    })

  }


  return (
    <DeleteModalContext value={showModal}>

      {children}
      <Modal
        open={modalProps.isOpen}
        component={"form"}
        onSubmit={(e) => deleteSubmit(e)}
        onClose={closeModal}>

        <div className="flex flex-col justify-center items-center h-full ">

          <Paper sx={{ width: "50%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 }}>
            <Alert variant="filled" severity="error" onClose={closeModal}>
              Delete Item <span className="uppercase"> {modalProps.name}</span>
            </Alert>

            <Typography sx={{ px: 2 }}> Are you sure you want to delete: <span className="uppercase font-bold">{modalProps.name}</span><br /> <span>{modalProps.text}</span></Typography>


            <Divider />
            <div className="flex justify-between px-4">
              <Button type="button" variant="outlined" onClick={closeModal}>Cancel</Button>
              <Button type="submit" color="error" variant="contained" >Delete</Button>

            </div>
            <Divider />
          </Paper>
        </div>
      </Modal>

    </DeleteModalContext >
  )
}

export default DeleteModal
export { DeleteModalContext }
