import {BrowserRouter as Router,Routes} from 'react-router-dom'
import {Route} from 'react-router'
import PayIn from './Pages/PayIn'
import PayInPayment from './Pages/PayInPayment'
import PayInExpired from './Pages/PayInExpired'
import NotFound from './Pages/NotFound'

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
        <Route exact path="/" element={<>Home</>}/>
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
