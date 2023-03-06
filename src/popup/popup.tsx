import React from 'react'
import {createRoot} from 'react-dom/client';
import Header from '../components/Header';
import './popup.css';

const root = document.createElement('div')
root.id = "root" 
createRoot(document.body.appendChild( root )).render(<Header />)