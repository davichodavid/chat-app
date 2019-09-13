import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

const initState = {
  general: [
    { from: 'Mike', msg: 'Hello, did this work' },
    { from: 'John', msg: 'I guess it did' },
    { from: 'Jean', msg: 'There will be a problem hosting this' },
    { from: 'Lindz', msg: 'Of course, things are never that easy' }
  ],
  topic2: [
    { from: 'Alla', msg: 'Getting this done feels pretty good' },
    { from: 'Juna', msg: 'Yeah, but we should put more time into it' },
    { from: 'Brian', msg: "I'm getting there, it'll be ok" },
    { from: 'Cat', msg: 'I believe it' }
  ]
};

const reducer = (state, action) => {
  const { from, msg } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [action.payload.topic]: [
          ...state[action.payload.topic],
          {
            from: from,
            msg: msg
          }
        ]
      };
    default:
      return state;
  }
};

let socket;

const sendChatActions = value => {
  socket.emit('chat message', value);
};

const Store = props => {
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', function(msg) {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    });
  }

  const user = 'David' + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatActions, user }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
