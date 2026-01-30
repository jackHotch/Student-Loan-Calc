import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center p-8'>
      <div className='flex flex-col items-center gap-4 w-fit'>
        <h1 className='text-6xl font-bold'>Loan Calculator</h1>
        <p className='text-zinc-500'>A tool to help you manage your debt and spend less money</p>
        <Button size='lg'>Start saving money</Button>
      </div>
    </div>
  )
}
