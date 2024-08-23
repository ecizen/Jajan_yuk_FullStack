'use client'
import Banner from '@/components/banner'
import ProductList from '@/components/product-list'
import Container from '@/components/ui/container'
import React from 'react'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router =  useRouter()
  const {data:session} = useSession()
  
  if (session) {
    console.log("Ter autentikasi" , session)
  }
  return (
    <div className='max-w-7xl mx-auto px-4 py-4'>
      <Container>
        <div className=''>
          <ProductList
            title="Product List"
          />   
        </div>
      </Container>
    </div>
  )
}

export default HomePage;