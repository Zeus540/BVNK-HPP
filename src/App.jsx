import {BrowserRouter as Router,Routes} from 'react-router-dom'
import {Route} from 'react-router'
import PayIn from './pages/PayIn'
import PayInPayment from './pages/PayInPayment'
import PayInExpired from './pages/PayInExpired'
import NotFound from './pages/NotFound'

import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion'
import { SnackbarProvider } from 'notistack'

const helmetContext = {};
function App() {

return (
<SnackbarProvider maxSnack={1} anchorOrigin={{ horizontal: "center" , vertical: "top" }}>
  <HelmetProvider context={helmetContext}>
    <AnimatePresence mode='wait'>
    <Router>
      <Routes>
        <Route exact path="/payin/:UUID" element={<PayIn/>}/>
        <Route exact path="/payin/:UUID/pay" element={<PayInPayment/>}/>
        <Route exact path="/payin/:UUID/expired" element={<PayInExpired/>}/>
        <Route  path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
    </AnimatePresence>
    </HelmetProvider>
  </SnackbarProvider>
  )
}

export default App
