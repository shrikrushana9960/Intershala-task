import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const DataLayerContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

DataLayer.propTypes = {
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export const useDataLayerValue = () => useContext(DataLayerContext);
