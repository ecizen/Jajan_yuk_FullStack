import ForYou from '@/components/for-you'
import React from 'react'

export default function ProductForYou() {
  return (
    <div className='overflow-hidden max-w-7xl'>
        <section className='min-h-screen bg-white lg:px-12 px-8 py-8'>
            <div>
                <h1 className='text-2xl font-bold text-neutral-900'>Best Product You</h1>
            </div>
            <div className='mt-6'>
                <ForYou/>
            </div>
        </section>
    </div>
  )
}
