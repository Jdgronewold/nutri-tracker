import React from 'react'
import dynamic from "next/dynamic";

const Auth = dynamic(
  () => { return import('../components/Auth/authCreate') },
  { ssr: false }
)
export default () => {
  return <Auth />
}