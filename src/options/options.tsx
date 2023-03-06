import React from 'react'
import {createRoot} from 'react-dom/client';
import './options.css'

const Options = <h1>Options Page: Hello World</h1>


const root = document.createElement('div')
root.id="root";
createRoot(document.body.appendChild(
	root
)).render(Options)