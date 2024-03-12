'use client'
import React from "react"
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();
  const handleClick = () => {
    router.push("/v1/signup")
  }
  handleClick();
    return (
    <>
       <h1>Please Wait...</h1>
    </>
    )
  }
  