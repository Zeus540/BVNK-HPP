import React,{useEffect} from 'react'
import { useNavigate } from 'react-router'
import Seo from '../components/Seo'
import { Root } from '../styles/global'


const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(`/`)
        }, 2000);
    
    }, [])
    
  return (
    <Root>
        <Seo title="404"/>
        404 | NotFound
        </Root>
  )
}

export default NotFound