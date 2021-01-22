import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

// customize
import common from './styles/common';

const useStyles = makeStyles(theme => (common(theme)));

export const SearchArea = ({ title, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={classes.searchArea}>
      <Box padding="10px 0 8px"><Typography variant="h6" className={classes.title}>{title}</Typography></Box>
      {props.children ? props.children : '{props.children}'}
    </Box>
  );
};

SearchArea.propTypes = {
  title: PropTypes.string.isRequired,
};

SearchArea.defaultProps = {
  title: 'Title',
};

export default SearchArea;