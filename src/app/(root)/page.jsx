'use client'
import Banner from '@/components/banner'
import ProductList from '@/components/product-list'
import Container from '@/components/ui/container'
import React from 'react'
import getBanner from '../../../actions/get-banner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import HeroSection from './components/hero'
import ProductForYou from './components/for-you'

const HomePage = () => {
  const router =  useRouter()
  const {data:session} = useSession()
  
  if (session) {
    console.log("Ter autentikasi" , session)
  }
  return (
    <main className='max-w-7xl mx-auto '>
      <Container>
        <div className=''>
          <HeroSection/>
          <ProductForYou/>
        </div>
      </Container>
    </main>
  )
}

export default HomePage;