import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Divider, Modal, TextField, Button, Container } from '@material-ui/core';

// common
import Header from '../common/Header';
import SearchArea from '../common/SearchArea';

// customize
import common from '../common/styles/common';
import { call } from '../../apiInstance';
import LoadingOverlay from 'react-loading-overlay';
import GroupInfoCard from './GroupInfoCard';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => common(theme));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Main = ({ user, onLogin, onLogout, ...props }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [groupId, setGroupId] = React.useState('');
  const [wrongMsg, setWrongMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [groupInfo, setGroupInfo] = React.useState(null);
  const [nextToken, setNextToken] = React.useState('');
  const [buttonName, setButtonName] = React.useState('처음');
  const [count, setCount] = React.useState(1);

  const getCommentsArray = (comments, idx = 1) => comments.data.reduce((acc, cur) => {
    acc.push({
      id: cur.id,
      "타입": "댓글",
      "작성자": cur.from.name,
      "내용": `${idx === 1 ? '↳' : '↳↳'}${cur.message}`,
      "작성일": cur.created_time,
      "수정일": "",
    });
    cur.comments && acc.push(...getCommentsArray(cur.comments, ++idx));
    return acc;
  }, []);

  const resetState = () => {
    setCount(1);
    setNextToken('');
    setButtonName(null);
  }

  const onClickDownLoadData = async () => {
    setIsActive(true);

    const feedInfo = await call({
      url: `/api/workplace/feed`, body: {
        "groupId": groupId,
        "paging_token": nextToken
      }, method: 'POST'
    });

    setNextToken(feedInfo.paging && feedInfo.paging.next);
    setButtonName(feedInfo.paging && '다음');
    if (feedInfo.data.length === 0) {
      setIsActive(false);
      setWrongMsg('더 이상 Export 할 데이터가 없습니다!');
      setOpen(true);
      resetState();
      return;
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(feedInfo.data.reduce((acc, cur) => {
      acc.push({
        id: cur.id,
        "타입": "게시글",
        "작성자": cur.from.name,
        "내용": cur.message,
        "작성일": cur.created_time,
        "수정일": cur.updated_time,
      });
      if (cur.comments) {
        acc.push(...getCommentsArray(cur.comments));
      }
      return acc;
    }, []));
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${groupId}_${count}${fileExtension}`);
    setCount( count + 1);
    setIsActive(false);

  }
  const onClickHandle = async (e) => {
    setIsActive(true);
    const _groupInfo = await call({ url: `/api/workplace/group?groupId=${groupId}`, method: 'get' });

    setIsActive(false);
    if (_groupInfo.statusCode === 400) {
      setWrongMsg('잘못된 Group ID 입니다.');
      setOpen(true);
      return;
    }
    resetState();
    setButtonName('처음');
    setGroupInfo(_groupInfo);
  }
  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text='Loading data...'
    >
      <Container maxWidth="sm">
        <Grid item container className={classes.layerHeader} xs={12}>
          <Header user={user} onLogin={onLogin} onLogout={onLogout} />
        </Grid>
        <Grid item container>
          <Grid item className={classes.layerContents}>

            <SearchArea title={'검색조건'}>
              <Box display="flex" flexDirection="row">
                <Box pr={1}>
                  <TextField id="outlined-basic" label="Workplace Group ID" variant="outlined" onChange={e => {
                    setGroupId(e.target.value);
                    setGroupInfo(null);
                  }} size="small" />
                </Box>
                <Divider orientation="vertical" flexItem style={{ height: '32px', position: 'relative', top: '4px' }} />
                <Box flexGrow={1} textAlign="right">
                  <Button variant="contained" color="primary" className={classes.button} startIcon={<SearchIcon />} onClick={onClickHandle} >조회</Button>
                </Box>
              </Box>
            </SearchArea>
            {groupInfo && <GroupInfoCard groupInfo={groupInfo} buttonName={buttonName} onClickDownLoadData={onClickDownLoadData} />}
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={(_) => { setOpen(false) }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">경고</h2>
          <p id="simple-modal-description">
            {wrongMsg}
          </p>
        </div>
      </Modal>
    </LoadingOverlay>
  );
}
export default Main;