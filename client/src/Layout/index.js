import React, { useEffect } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';

import PropTypes from 'prop-types';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import Api from '../utils/Api';
import { useNavigate } from 'react-router-dom';
const Layout = ({ children }) => {
  const [{ userDetails }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDetails?.name) {
      getUser();
    }
  }, []);
  const getUser = async () => {
    try {
      let res = await Api.get('/user');
      console.log(res.data);
      if (res.data.success) {
        console.log(res.data.data);
        dispatch({
          type: 'SET_USER_DETAILS',
          userDetails: res.data.data
        });
      }
    } catch (e) {
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        errMess: { message: 'Account Not Found ', type: 'error' }
      });
      navigate('/login');
    }
  };
  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired
};
export default Layout;
