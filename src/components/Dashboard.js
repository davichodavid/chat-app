import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: '50px'
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
    width: '15%'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant='h4' component='h4'>
        Chat App
      </Typography>
      <Typography variant='h5' component='h5'>
        Topic Placeholder
      </Typography>
      <div className={classes.flex}>
        {/********************* Topics Window *******************/}
        <div className={classes.topicsWindow}>
          <List>
            {['topic'].map(topic => (
              <ListItem key={topic} button>
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </div>
        {/********************* Chat Window *******************/}
        <div className={classes.chatWindow}>
          {[{ from: 'user', msg: 'Hello user' }].map((chat, index) => (
            <div className={classes.flex} key={index}>
              <Chip label={chat.from} className={classes.chip} />
              <Typography variant='p'>{chat.msg}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}></div>
    </Paper>
  );
};

export default Dashboard;
