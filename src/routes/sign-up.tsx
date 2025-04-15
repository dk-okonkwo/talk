import { Form } from '@/components/ui/form'
import { UserFormValidation } from '@/lib/validation'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Genders, Institutions, UserFormDefaultValues } from '@/lib/constants'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/lib/types'
import { ClipboardPenLine, GraduationCap, Lock, Mail, User } from 'lucide-react'
import { SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Verification } from '@/components/Verification'



export const Route = createFileRoute('/sign-up')({
  component: SignUp,
})

function SignUp() {

  const [isLoading, setIsLoading] = useState(false)
  const [isVerificationOpen, setisVerificationOpen] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: UserFormDefaultValues
  })

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    if(values.password !== values.confirmPassword) {
      form.setError('confirmPassword', { message: 'Passwords do not match' })
      setIsLoading(false)
      return
    }
    try {
      const {confirmPassword,...userData} = values

      console.log('data to get saved',userData)
      setisVerificationOpen(true)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <main className="flex gap-8 w-full flex-col bg-talkBG items-center  text-center min-h-screen px-4 py-2 bg-gradient-to-b from-main/90 to-transparent to-30%">
      <img 
        src='/images/talk-logo.png'
        alt="Talk Logo"
        className='w-fit mx-auto'
      />
      
      <div>
        <h2 className="text-2xl poppins-semibold font-medium mb-1">{isVerificationOpen ? "Verification" : "Create Account"}</h2>
        <p className='opacity-80 text-sm tracking-wider'>{isVerificationOpen ? "Enter the code sent to your email" : "Let's start by creating your account"}</p>
      </div>
      {
        isVerificationOpen ? (
          <div className='flex flex-1 w-full justify-center'>
            <Verification/>
          </div>
        ) :(

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex bg-sec flex-col w-full gap-5">
            <CustomFormField
              control={form.control}
              name='firstName'
              fieldType={FormFieldType.INPUT}
              icon={<User/>}
              placeholder='First Name'
            />
            <CustomFormField
              control={form.control}
              name='lastName'
              fieldType={FormFieldType.INPUT}
              icon={<User/>}
              placeholder='Last Name'
            />
            <CustomFormField
              control={form.control}
              name='phone'
              fieldType={FormFieldType.PHONE_INPUT}
            />
            <CustomFormField
              control={form.control}
              name='email'
              fieldType={FormFieldType.INPUT}
              icon={<Mail/>}
              placeholder='Email'
              type='email'
            />
            <CustomFormField
              control={form.control}
              name="gender"
              fieldType={FormFieldType.SELECT}
              placeholder='Gender'
              icon={<User/>}
            >
              {Genders.map((gender, i) => (
                <SelectItem key={i} value={gender} className="cursor-pointer">
                    <p>{gender}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="institution"
              fieldType={FormFieldType.SELECT}
              placeholder='Institution'
              icon={<GraduationCap/>}
            >
              {Institutions.map((gender, i) => (
                <SelectItem key={i} value={gender} className="cursor-pointer">
                    <p>{gender}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name='registrationNumber'
              fieldType={FormFieldType.INPUT}
              icon={<ClipboardPenLine/>}
              placeholder='Registration Number'
            />
            <CustomFormField
              control={form.control}
              name='password'
              fieldType={FormFieldType.INPUT}
              icon={<Lock/>}
              placeholder='Create Password'
              type='password'
            />
            <CustomFormField
              control={form.control}
              name='confirmPassword'
              fieldType={FormFieldType.INPUT}
              icon={<Lock/>}
              placeholder='Confirm Password'
              type='password'
            />
            <CustomFormField
              control={form.control}
              name='termsConditionsConsent'
              fieldType={FormFieldType.CHECKBOX}
              label={<p className='text-sm font-light'>I agree to the <a className='text-blue-500'>terms and conditions</a> of <span className='text-main font-medium'>Talk</span></p>}
            />

            <Button  disabled={isLoading} className={'w-full py-5 text-base tracking-wide text-white rounded-full mt-3 bg-main'}>
              {isLoading ?(
                'Creating...'
              ):
                'Create Account'
              }
            </Button>
        <p className='text-black/70 text-sm tracking-wide'>Already have an account ? <Link to='/sign-in' className='text-main underline'>Sign-In</Link></p>
          </form>
        </Form>
        )
      }
    </main>

  )
}