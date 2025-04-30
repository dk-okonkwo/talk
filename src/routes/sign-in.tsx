import CustomFormField from '@/components/CustomFormField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { UserSignInFormDefaultValues } from '@/lib/constants'
import { FormFieldType } from '@/lib/types'
import {  UserSignInFormValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserSignInFormValidation>>({
    resolver: zodResolver(UserSignInFormValidation),
    defaultValues: UserSignInFormDefaultValues
  })

  const signInWithGoogle =()=>{
    console.log('sign in with google')
  }
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserSignInFormValidation>) {
    setIsLoading(true)

    try {

      console.log('data to get saved',values)
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <main className="flex gap-8 w-full  flex-col items-center  text-center min-h-screen px-4 py-2 bg-gradient-to-b from-main/20 to-transparent to-40%">
      <img 
        src='/images/talk-logo.png'
        alt="Talk Logo"
        className='w-fit mx-auto'
      />
      <div>
        <h2 className="text-2xl poppins-semibold font-medium mb-1">Sign In to Talk</h2>
        <p className='opacity-80 text-sm tracking-wider'>Please fill your credentitials to continue</p>
      </div>
      <button onClick={signInWithGoogle} className='flex  items-center gap-2 border border-black/20 divide-x rounded-lg shadow-xs px-6 py-2'>
        <img
          src='/images/google.png'
          alt="Google Logo"
          className='w-8 h-8 mx-auto '
        />
        <p className='text-sm tracking-wide'>Sign in with Google</p>
      </button>
      <div className='relative w-full'>
        <Separator />
        <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-0.5'>OR</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-between w-full *:w-full ">
          <div className='space-y-5'>

            <CustomFormField
              control={form.control}
              name='email'
              fieldType={FormFieldType.INPUT}
              icon={<Mail/>}
              placeholder='Enter your Email'
              type='email'
            />
            <div className='space-y-1'>
              <CustomFormField
                control={form.control}
                name='password'
                fieldType={FormFieldType.INPUT}
                icon={<Lock/>}
                placeholder='Enter your Password'
                type='password'
              />
              <p className='text-right text-black/80 text-xs font-light'>Forgot Password ?</p>
            </div>
            <CustomFormField
              control={form.control}
              name='rememberMeConsent'
              fieldType={FormFieldType.CHECKBOX}
              label={<p className='text-sm'>Remember me</p>}
            />
          </div>
          <div className='space-y-2'>
            <Button  disabled={isLoading} className={'text-base py-5 w-full tracking-wide text-white rounded-lg mt-3 bg-main hover:bg-main/90'}>
              {isLoading ?(
                'Logging In...'
              ):
                'Log In'
              }
            </Button>
            <p className='text-black/70 text-sm tracking-wide'>Don&apos;t have an account ? <Link to='/sign-up' className='text-main underline'>Sign-Up</Link></p>

          </div>
        </form>
      </Form>
    </main>

  )
}
