import { Button, Chip, TableCell, TableRow } from "@mui/material";

const OrderTableCel = ({ row, index, singleOrderInfo }) => {
  return (
    <>
      <TableRow
        key={row?.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <span className="text-caption font-bold"> {index + 1}</span>
        </TableCell>
        <TableCell component="th" scope="row">
          <span className="text-caption font-bold"> {row?.order_id}</span>
        </TableCell>
        <TableCell component="th" scope="row">
          <span className="text-caption font-bold">
            {row?.productName?.length > 30
              ? row?.productName.slice(0, 30) + "..."
              : row?.productName}
          </span>
        </TableCell>
        <TableCell align="left">
          <span className="text-caption font-bold">
            <span className="text-caption font-bold"> {row?.order_id}</span>
          </span>
        </TableCell>
        <TableCell align="left">
          <span className="text-caption font-bold"> $ {row?.total_price}</span>
        </TableCell>
        <TableCell align="left">
          <Chip
            label={row?.status}
            style={{
              fontWeight: 600,
              textTransform: "uppercase",
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
            }}
          />
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => singleOrderInfo(row?.order_id)}
          >
            Details
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderTableCel;
