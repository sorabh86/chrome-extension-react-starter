import React from 'react'
import {createRoot} from 'react-dom/client';
import './popup.css';

const root = document.createElement('div')
root.id = "root" 
createRoot(document.body.appendChild( root )).render(<h1>Popup page: Hello World</h1>)