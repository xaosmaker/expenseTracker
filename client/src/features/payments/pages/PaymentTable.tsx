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
import type { Payment } from '../types/paymentTypes';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PaymentTableRow from '../components/PaymentTableRow';
import { useSearchParams } from 'react-router-dom';
import Loop from "@mui/icons-material/Loop"
import IconButton from '@mui/material/IconButton';
import { queryClient } from '../../../queryClient';



export default function PaymentTable() {

  const [searchParams, setSearchParams] = useSearchParams({ rows: "25", page: "0" })
  const { data, isLoading, isFetching, } = useQuery({ queryKey: ["payments", searchParams.toString()], queryFn: () => getPayments(searchParams) })
  const payments: Payment[] = data

  function refetchQuery() {
    queryClient.invalidateQueries({ queryKey: ["payments"] })
  }



  if (isLoading) {

    return (<Box sx={{ height: "50dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>

      <CircularProgress />
    </Box>)
  }


  return (

    <Paper>

      <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto' }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>

            <TableRow>
              <TableCell>Payment Name</TableCell>
              <TableCell align="right">payed due data</TableCell>
              <TableCell align="right">amount</TableCell>
              <TableCell align="right">is Payed</TableCell>
              <TableCell align="right">created at</TableCell>
              <TableCell align="right">updated at</TableCell>
              <TableCell align='right'><IconButton onClick={refetchQuery} loading={isFetching}><Loop /></IconButton></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {payments.map((data) => (
              <PaymentTableRow {...data} key={data.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        rowsPerPage={Number(searchParams.get("rows"))}
        onPageChange={(_e, nextPage) => {
          searchParams.set("page", nextPage.toString())
          setSearchParams(searchParams)

        }} onRowsPerPageChange={(e) => {
          searchParams.set("rows", e.target.value)
          searchParams.set("page", '0')
          setSearchParams(searchParams)
        }}
        page={Number(searchParams.get('page'))} count={125} component={"div"} />
    </Paper>
  );
}
