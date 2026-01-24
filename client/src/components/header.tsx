import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export const Header = () => {
  return (
    <header className='flex justify-end items-center p-4 gap-4 h-16'>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className='bg-[#6c47ff] text-white rounded font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer'>
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
