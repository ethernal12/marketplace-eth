import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Noop = ({children}) => <>{children}</> // takes the children and re-renderes them

function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout ?? Noop // if Layout is undefined (null) => Noop

  return (
  <Layout>
    <ToastContainer/>
    <Component {...pageProps} />

  </Layout>

  )
}

export default MyApp
