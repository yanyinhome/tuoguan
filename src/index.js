import React from 'react';
import ReactDOM from 'react-dom';
import 'lib-flexible';

/* 引入app */
import AppRouter from './router';

ReactDOM.render(<AppRouter/>,
  document.getElementById('root')
);
