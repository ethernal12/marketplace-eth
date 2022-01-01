import '@styles/globals.css'

const Noop = ({children}) => <>{children}</> //  takes the children and re-render them

function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout ?? Noop // if Layout is undefined (null) => Noop

  return (
  <Layout>

    <Component {...pageProps} />

  </Layout>

  )
}

export default MyApp
