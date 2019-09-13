import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import { CTX } from '../Store';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: '50px auto 0',
    maxWidth: '1000px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid black'
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px'
  },
  chatBox: {
    width: '85%'
  },
  button: {
    // width: '15%'
    backgroundColor: 'coral'
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  /**************** Context Store **************/
  const { allChats, sendChatActions, user } = React.useContext(CTX);
  console.log(allChats);

  const topics = Object.keys(allChats);

  const [textValue, setTextValue] = useState('');
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  return (
    <Paper className={classes.root}>
      <Typography variant='h4' component='h4'>
        Chat App
      </Typography>
      <Typography variant='h5' component='h5'>
        {activeTopic}
      </Typography>
      <div className={classes.flex}>
        {/********************* Topics Window *******************/}
        <div className={classes.topicsWindow}>
          <List>
            {topics.map(topic => (
              <ListItem
                onClick={e => setActiveTopic(e.target.innerText)}
                key={topic}
                button>
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </div>
        {/********************* Chat Window *******************/}
        <div className={classes.chatWindow}>
          {allChats[activeTopic].map((chat, index) => (
            <div className={classes.flex} key={index}>
              <Chip label={chat.from} className={classes.chip} />
              <Typography>{chat.msg}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          className={classes.chatbox}
          label='Message'
          style={{ margin: 8 }}
          fullWidth
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={textValue}
          onChange={e => {
            setTextValue(e.target.value);
          }}
        />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={() => {
            sendChatActions({ from: user, msg: textValue, topic: activeTopic });
            setTextValue('');
          }}>
          Send
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </div>
    </Paper>
  );
};

export default Dashboard;
