/* user customize style */

const productTagStyles = (theme) => {
  return ({
    root: {
      "& > *": {
        //
      },
    },

    // container :: start
    layerRoot: {
      minWidth: 600,
      maxWidth: '100%',
      margin: '0',
      padding: '0',
    },
    layerHeader: {
      height: '64px',
      background: '#fff',
      boxSizing: 'border-box',
      // borderBottom: '1px solid #e6eaf4',
    },
    layerLeft: {
      width: '240px',
      minHeight: 'calc(100vh - 64px)',
      borderRight: '1px solid #e6eaf4',
      background: "#fff",
    },
    layerRight: {
      width: 'calc(100% - 240px)',
      minHeight: 'calc(100vh - 64px)',
      padding: '0 12px 24px',
      background: "#f6f7fb",
      overflow: 'hidden',
    },
    layerContents: {
      width: '100%',
      minHeight: '100vh',
      padding: '0 12px 24px',
      background: "#f6f7fb",
      overflow: 'hidden',
    },
    // container :: end

    // search :: start
    searchArea: {
      minWidth: '500px',
      height: '100px',
      margin: '0 -12px',
      padding: '0 32px',
      background: '#fff',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.08)',
    },
    // search :: end

    // accordion :: start
    column: {
      flexBasis: '33.33%',
      minWidth: '388px',
      maxWidth: '405px',
      marginBottom: '16px',
    },
    double: {
      flexBasis: '66.66%',
      minWidth: '775px',
      maxWidth: '809px',
    },
    // accordion :: end

    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      margin: theme.spacing(1),
    },
  });
};

export default productTagStyles;