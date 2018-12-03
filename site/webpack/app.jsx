import React, { Component } from 'react';
import {render} from 'react-dom';
import Hello from './components/Hello';
import App from './components/App'
import Collections from './components/Collections'

//import Button from 'react-bootstrap/lib/Button';


render(<App />, document.getElementById('App'));
render(<Collections />, document.getElementById('Collections'));
