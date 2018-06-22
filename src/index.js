import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import registerServiceWorker from './registerServiceWorker'

import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css';


ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
