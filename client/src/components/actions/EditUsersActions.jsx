import { Box, CircularProgress, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useUpdateUserMutation } from "state/api";
import toast from "react-hot-toast";

const EditUsersActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateUser, isUpdated] = useUpdateUserMutation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      updateUser({ id: params.id, ...params.row });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.success("The user was not found in the database");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (isUpdated.data) {
      setSuccess(true);
      setRowId(null);
      toast.success("The user has already updated");
      setLoading(false);
    } else if (isUpdated.error) {
      toast.error("Reload the page");
    }
  }, [isUpdated.data, isUpdated.error]); // eslint-disable-next-line

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId, params.id, success]);

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
              bgcolor: green[500],
              "&:hover": { bgcolor: green[700] },
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
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
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
