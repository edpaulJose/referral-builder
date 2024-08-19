import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

// utils
import { DEFAULT_PAGINATION, MODES } from "../../utils/staticConstants";

// custom components
import DataTable from "../../components/DataTable";
import CustomDialog from "../../components/CustomDialog";
import ReferralForm from "../../components/ReferralForm";

// api
import {
  getReferals,
  updateReferralById,
  createReferral,
  deleteReferralById,
} from "../../api/referral";

const HEADERS = [
  { key: "avatarFile", label: "", width: "10"},
  { key: "firstName", label: "Given Name", width: "25%" },
  { key: "lastName", label: "Surname", width: "20%" },
  { key: "email", label: "Email", width: "20%" },
  { key: "phone", label: "Phone", width: "15%" },
  { key: "actions", label: "Actions", align: "center", width: "10%" },
];

const HomePage = () => {
  const [referrals, setReferrals] = useState([]);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [openForm, setOpenForm] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  const [mode, setMode] = useState(MODES[0]);

  const fetchReferrals = useCallback(async (pagination) => {
    const { error, data } = await getReferals(pagination);
    if (!error) {
      setReferrals(data.referrals || []);
      setPagination({
        page: data.currentPage ? data.currentPage : DEFAULT_PAGINATION.page,
        limit: data.limit || DEFAULT_PAGINATION.limit,
        totalRecords: data.totalReferrals || DEFAULT_PAGINATION.totalRecords,
        totalPages: data.totalPages || DEFAULT_PAGINATION.totalPages,
      });
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  const handlePageChange = useCallback(
    (event, newPage) => {
      fetchReferrals({
        ...pagination,
        page: newPage + 1,
      });
    },
    [pagination]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      fetchReferrals({
        ...pagination,
        page: DEFAULT_PAGINATION.page,
        limit: event.target.value,
      });
    },
    [fetchReferrals, pagination]
  );

  const handleAdd = () => {
    setOpenForm(true);
    setMode(MODES[1]);
  };

  const handleView = (payload) => {
    setSelectedReferral(payload);
    setOpenForm(true);
    setMode(MODES[0]);
  }

  const handleEdit = useCallback((payload) => {
    setOpenForm(true);
    setMode(MODES[2]);
    setSelectedReferral(payload);
  }, []);

  const handleDelete = (payload) => {
    setSelectedReferral(payload);
    setOpenAlertDelete(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setOpenAlertDelete(false);
    setSelectedReferral(null);
  };

  const handleConfirmDelete = useCallback(async () => {
    const response = await deleteReferralById(selectedReferral?._id);
    if (!response.error) {
      fetchReferrals(pagination);
      setOpenAlertDelete(false);
      setSelectedReferral(null);
    }
  }, [selectedReferral, pagination, fetchReferrals]);

  const handleSave = useCallback(
    async (formData) => {
      let response = {};
      if (selectedReferral) {
        response = await updateReferralById(selectedReferral?._id, formData);
      } else {
        response = await createReferral(formData);
      }

      if (!response.error) {
        await fetchReferrals(pagination);
        setOpenForm(false);
        setSelectedReferral(null);
      }
    },
    [selectedReferral, pagination, fetchReferrals]
  );

  return (
    <Box sx={{ height: "100vh" }}>
      <DataTable
        id="Home-DataTable"
        data={referrals}
        headers={HEADERS}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onView={handleView}
      />
      <CustomDialog
        id="Home-ReferralForm-CustomDialog"
        open={openForm}
        onClose={handleClose}
      >
        <ReferralForm
          id="CustomDialog-ReferralForm"
          dataObj={selectedReferral}
          onSave={handleSave}
          mode={mode}
        />
      </CustomDialog>
      <CustomDialog
        id="Home-Alert-CustomDialog"
        open={openAlertDelete}
        title="Delete"
        actions={
          <>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" onClick={handleConfirmDelete}>
              Yes
            </Button>
          </>
        }
      >
        <Typography>
          {`Are you sure you want to delete this referral with email ${selectedReferral?.email}`}
        </Typography>
      </CustomDialog>
    </Box>
  );
};

export default HomePage;
