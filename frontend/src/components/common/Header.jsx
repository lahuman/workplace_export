import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

import ImportExportIcon from '@material-ui/icons/ImportExport';

export const Header = ({ user, onLogin, onLogout, ...props }) => {

  return (
    <Box flexGrow={1} height={64} bgcolor="#fff" borderBottom="1px solid #e6eaf4" boxSizing="border-box">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar >
            <Box marginTop="4px" style={{ display: "flex" }}>
              <ImportExportIcon style={{ fill: "white", backgroundColor: "blue" }} /> &nbsp;&nbsp;Workplace Export
            </Box>
          <Box flexGrow={1}>
            <Typography variant="h6"></Typography>
            {props.children ? props.children : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

Header.propTypes = {
  user: PropTypes.string.isRequired,
  onLogin: PropTypes.bool,
  onLogout: PropTypes.bool,
};

Header.defaultProps = {
  user: 'user',
  onLogin: false,
  onLogout: true,
};

export default Header;