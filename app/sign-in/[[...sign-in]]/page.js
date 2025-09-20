'use client'

import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="relative h-screen w-full">
     
      <Image
        src="/uberbanner.png"
        alt="KriGO Banner"
        fill
        className="object-cover pointer-events-none -z-10"
        priority
      />

      {/* Sign in box */}
      <div className="absolute top-20 right-10 z-10 bg-white/90 rounded-xl p-4">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/ride"         
          afterSignUpUrl="/ride"
        />
      </div>
    </div>
  )
}
