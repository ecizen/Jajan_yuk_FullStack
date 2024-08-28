'use client'

import Container from '@/components/ui/container'
import React from 'react'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import HeroSection from './components/hero'
import ProductForYou from './components/for-you'
import BenefitSection from './components/we-benefit';
import WyhCoosMeSection from './components/why-coose-me';
import BestProduct from './components/best-product';

const HomePage = () => {
  const router =  useRouter()
  const {data:session} = useSession()
  
  if (session) {
    console.log("Ter autentikasi" , session)
  }
  return (
    <main className='max-w-7xl mx-auto overflow-hidden '>
      <Container>
        <div className=''>
          <HeroSection/>
          <ProductForYou/>
          <BenefitSection/>
          <WyhCoosMeSection/>
          <BestProduct/>
        </div>
      </Container>
    </main>
  )
}

export default HomePage;