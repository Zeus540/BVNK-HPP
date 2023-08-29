import React from 'react'
import { Helmet } from 'react-helmet-async'

const Seo = ({title,content}) => {
  return (
    <Helmet>
    <title>BVNK HPP - {title}</title>
    <meta name='description' content={content} />
    </Helmet>
  )
}

export default Seo