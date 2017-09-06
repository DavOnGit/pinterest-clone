import React from 'react'
import Helmet from 'react-helmet'
import Header from './Header.jsx'

const Layout = ({children}) =>

  <div className="wrapper" id="wrapper">

    <Helmet>
      <title>Pixy</title>
      <link
        name="bootstrap"
        rel="stylesheet"
        type="text/css"
        href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossOrigin="anonymous"
      />
      <link
        name="font-awesome"
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </Helmet>

    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>

    <Header/>

    <div className="main">

      {children}

    </div>

    <div className="footer">&copy; Pixy</div>

  </div>

export default Layout
