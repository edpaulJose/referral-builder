import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  IconButton,
  Button,
  Avatar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// custom components
import SimpleAvatar from "../SimpleAvatar";

// utils
import {
  DEFAULT_PAGINATION,
  ROWS_PER_PAGE_OPTIONS,
} from "../../utils/staticConstants";

const DataTable = ({
  id,
  data = [],
  pagination = DEFAULT_PAGINATION,
  headers = [],
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  onAdd,
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
}) => {
  const handleEdit = useCallback(
    (event, payload) => {
      event.stopPropagation();
      onEdit(payload);
    },
    [onEdit]
  );

  const handleDelete = useCallback(
    (event, payload) => {
      event.stopPropagation();
      onDelete(payload);
    },
    [onDelete]
  );

  const renderTableCell = useCallback(
    (header = {}, row) => {
      const value = row[header.key];
      if (header.key === "avatarFile") {
        return (
          <SimpleAvatar
            id={`${header.key}-simpleAvatar`}
            alt={`${row.firstName} ${row.lastName}`}
            src={value}
          />
        );
      } else if (header.key === "actions") {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={(event) => handleEdit(event, row)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={(event) => handleDelete(event, row)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        );
      } else if (header.format && typeof value === "number") {
        return header.format(value);
      }
      return value;
    },
    [handleEdit, handleDelete]
  );

  return (
    <Box
      id={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {onAdd && (
        <Button
          onClick={onAdd}
          variant="contained"
          size="small"
          sx={{ margin: "8px 0px" }}
        >
          Create New Referral
        </Button>
      )}
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header.key}
                    align={header.align}
                    sx={{ width: header.width }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  hover
                  key={row._id}
                  onClick={() => onView(row)}
                  className="hover-cursor"
                >
                  {headers.map((header) => {
                    return (
                      <TableCell
                        key={header.key}
                        align={header.align}
                        sx={{ width: header.width }}
                      >
                        {renderTableCell(header, row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={pagination.totalRecords}
          rowsPerPage={pagination.limit}
          page={pagination.page - 1}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};

DataTable.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // Define the shape of your row data here
    })
  ).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
  }),
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      width: PropTypes.string,
      align: PropTypes.oneOf(["left", "center", "right"]),
      format: PropTypes.func,
    })
  ).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default memo(DataTable);
