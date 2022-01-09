
import React from 'react'
import ReactDOM from 'react-dom'
import Skewt from './skewt'
import { datums } from './data'

ReactDOM.render(<Skewt datums={datums} />, document.getElementById('root'));
