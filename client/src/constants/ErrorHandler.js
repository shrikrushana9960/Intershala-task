// eslint-disable-next-line
/* eslint-disable prettier/prettier */
import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../DataLayer/DataLayer';

const ErrorHandler = () => {
  const [{ errMess }, dispatch] = useDataLayerValue();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (errMess) {
      setOpen(true);
    }
  }, [errMess]);

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: 'SET_ERROR_MESSAGE',
      errMess: null
    });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      {errMess && (
        <Alert onClose={handleClose} severity={errMess?.type} sx={{ width: '100%' }}>
          {errMess?.message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default ErrorHandler;
