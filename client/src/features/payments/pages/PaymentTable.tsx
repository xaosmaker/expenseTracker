import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { getPayments } from '../services/paymentServices';
import TablePagination from '@mui/material/TablePagination';




interface Payment {
  id: number
  name: string
  payedDueDate: Date
  amount: number
  userId: number
  isPayed: boolean
  createdAt: Date
  updatedAt: Date
}




function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(7, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(8, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(9, 'Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {

  const { data, error, isLoading } = useQuery({ queryKey: ["payments"], queryFn: getPayments })
  const payments: Payment[] = data
  console.log(payments, isLoading);

  console.log(22, data);
  console.log("e", error?.message);

  return (

    <Paper>

      <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto' }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Payment Name</TableCell>
              <TableCell align="right">payed due data</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell></TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 15]} rowsPerPage={5} onPageChange={(e, nextPage) => {
        console.log("page", e, nextPage);
      }} onRowsPerPageChange={(e) => {
        console.log("row", e.target.value);
      }} page={4} count={125} component={"div"} />
    </Paper>
  );
}
