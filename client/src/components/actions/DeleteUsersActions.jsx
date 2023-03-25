import { Box, CircularProgress, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { Check } from "@mui/icons-material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { red } from "@mui/material/colors";
import { useDeleteItemMutation } from "state/api";
import toast from "react-hot-toast";

const EditUsersActions = ({
  params,
  rowDelete,
  setRowDelete,
  handleDeleteRow,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteUser, isDelete] = useDeleteItemMutation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      deleteUser({ id: params.id });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.success("The user was not found in the database");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (isDelete.data) {
      setSuccess(true);
      setRowDelete(null);
      handleDeleteRow();
      toast.success("The user was deleted");
      setLoading(false);
    } else if (isDelete.error) {
      toast.error("Reload the page");
    }
  }, [isDelete.data, isDelete.error]); // eslint-disable-next-line

  useEffect(() => {
    if (rowDelete === params.id && success) setSuccess(false);
  }, [rowDelete, params.id, success]);

  return (
    <>
      <Box
        sx={{
          m: 1,
          position: "relative",
        }}
      >
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: red[500],
              "&:hover": { bgcolor: red[700] },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            disabled={params.id !== rowDelete || loading}
            onClick={handleSubmit}
          >
            <RemoveCircleIcon />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: red[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default EditUsersActions;
