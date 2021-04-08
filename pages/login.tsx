import React from 'react'
import dynamic from "next/dynamic";

const Auth = dynamic(
  () => { return import('../components/Auth/authLogin') },
  { ssr: false }
)
export default ({navigation}) => {
  return <Auth navigation={navigation} />
}