'use client'

import ProductList from '@/components/product-list'
import Container from '@/components/ui/container'
import React from 'react'

import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router =  useRouter()
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