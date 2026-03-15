'use client'

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Calculator, User } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'

export const Header = () => {
  const { openUserProfile } = useClerk()
  const pathname = usePathname()

  if (pathname != '/') return null

  return (
    <>
      <header className='flex justify-between items-center p-6 gap-4 h-16'>
        <div className='flex items-center gap-2'>
          <Calculator className='text-primary-500' size={32} />
        </div>
        <div className='flex items-center justify-center gap-3'>
          <ModeToggle />
          <SignedOut>
            <SignInButton>
              <Button variant='secondary'>Sign in</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <User onClick={() => openUserProfile()} className='cursor-pointer' />
          </SignedIn>
        </div>
      </header>
      <hr className='text-primary-500' />
    </>
  )
}
