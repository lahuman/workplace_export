import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 530,
    marginTop: 10
  },
  media: {
    height: 140,
  },
  customLabel: {
    display: 'block',
    paddingRight: '8px',
    fontSize: '13px',
    fontWeight: '600',
    lineHeight: '18px',
    letterSpacing: '-1px',
    color: '#575d72',
    whiteSpace: 'normal',
    boxSizing: 'border-box',
  },
});


export default function MediaCard({ groupInfo, onClickDownLoadData, buttonName }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={groupInfo.cover.source}
          title={groupInfo.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {groupInfo.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="ul">

            {groupInfo.owner && <li>
              <Link target="_blank" href={`${process.env.REACT_APP_WORKPLACE}/${groupInfo.owner.id}`}>관리자 : {groupInfo.owner.name}</Link>
            </li>}
            <li >
              공개 여부 : {groupInfo.privacy}
            </li>
            <li >
              운영중 여부 : {groupInfo.archived ? "보관" : "운영"}
            </li>
            <li >
              마지막 등록일 : {groupInfo.updated_time}
            </li>

          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {buttonName && <Button size="small" color="primary" onClick={onClickDownLoadData}>
          {buttonName} {process.env.REACT_APP_LIMIT || 100}개 데이터 다운로드
        </Button>}
      </CardActions>
    </Card>
  );
}