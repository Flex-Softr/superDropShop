import {
  Button,
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import useOrders from "../../../../../hooks/useOrders";
import Pagination2 from "../../../../../components/Pagination2/Pagination2";
import useTotalOrders from "../../../../../hooks/useTotalOrders";
import { useNavigate } from "react-router-dom";

const RecentOrders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: recentOrders } = useOrders(
    "api/admin/dashboard/recent-orders",
    currentPage
  );
  const navigate = useNavigate();
  const totalOrders = useTotalOrders();
  const totalPage = Math.ceil(totalOrders?.data?.payload?.totalOrderCount / 5);
  const rows = recentOrders?.payload?.orders;
  return (
    <>
      <div className="shadow-md rounded-md p-2 md:p-5 mt-5 bg-white">
        <h2 className="dashboard-title">Recent orders </h2>
        <Divider style={{ marginBottom: "20px" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="left">Seller name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map(row => (
                <TableRow
                  key={row?.order_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <span className="font-semibold text-caption">
                      {row?.order_id}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="text-caption font-bold">
                      {row?.seller?.name}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-semibold">{row?.seller?.email}</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="font-semibold text-caption">
                      $ {row?.total_cost}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      label={row.status}
                      style={{
                        background: `${
                          row?.status === "shifted"
                            ? "#29cc97"
                            : row.status === "pending"
                            ? "#fec400"
                            : row.status === "picked by currier"
                            ? "#4c84ff"
                            : row.status === "canceled"
                            ? "#fe5461"
                            : row.status === "completed"
                            ? "#2DB224"
                            : row.status === "processing"
                            ? "#FA8232"
                            : ""
                        }`,
                        color: "#fff",
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate(`/dashboard/admin/order/${row.order_id}`)
                      }
                      className="!text-white"
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
          <Pagination2
            data={recentOrders}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalData={totalOrders?.data?.payload?.totalOrderCount}
            totalPage={totalPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default RecentOrders;
