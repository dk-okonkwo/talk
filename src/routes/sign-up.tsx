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
import { GraduationCap, Lock, Mail, User } from 'lucide-react'
import { SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Verification } from '@/components/Verification'
import StatusLine from '@/components/StatusLine'



export const Route = createFileRoute('/sign-up')({
  component: SignUp,
})

function SignUp() {

  const [isLoading, setIsLoading] = useState(false)
  const [isVerificationOpen, setisVerificationOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(1)


  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: UserFormDefaultValues,
    mode:"onTouched"
  })

 function onSubmit (values:z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try {
      const {confirmPassword,...userData} = values
  
      console.log('data to get saved',userData)
      setisVerificationOpen(true)
    } catch (error) {
      console.log('error',error)
      
    }
    finally {
      setIsLoading(false)
    }
  }
  
  const handleNext = async() => {
    if(activeSlide === 1) {
      const isValid = await form.trigger(['firstName','lastName','password','confirmPassword']);
      if (isValid) {
        const values = form.getValues();
        if(values.password !== values.confirmPassword) {
          form.setError('confirmPassword', { message: 'Passwords do not match' })
          return
        }
        setActiveSlide(2)
      } 
    }
    if(activeSlide === 2) {
      const isValid = await form.trigger(['phone','email','gender']);
      isValid && setActiveSlide(3)
    }
  }

  const title = activeSlide === 1 ? "Start Your 14-Day Free Trial Today." : activeSlide === 2 ? "Personal Details" : "Select Your Institution"
  const description = activeSlide === 1 ? "No credit card required." : activeSlide === 2 ? "ALMOST THERE!" : "FINAL STEP!"
  return (
    <main className="flex gap-3 size-full flex-col bg-talkBG items-center  text-center min-h-screen px-4 py-2 bg-gradient-to-b from-main/90 to-transparent to-40%">
      <img 
        src='/images/talk-logo.png'
        alt="Talk Logo"
        className='w-fit mx-auto'
      />
      
      <div>
        <h2 className="text-2xl poppins-semibold font-medium mb-1">{isVerificationOpen ? "Verification" : title}</h2>
        <p className='opacity-80 uppercase text-sm tracking-wider text-main'>{isVerificationOpen ? "Enter the code sent to your email" : description}</p>
      </div>
      {
        isVerificationOpen ? (
          <div className='flex flex-1 w-full justify-center'>
            <Verification/>
          </div>
        ) :(

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 mt-4 flex flex-col justify-between *:w-full items-center *:flex *:flex-col  w-full *:gap-5">
            { 
              activeSlide === 1 && (
                <div>
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
                </div>
              )
            }
            {
              activeSlide === 2 && (
                <div>
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
                </div>
              )
            }
            {
              activeSlide === 3 && (
                <div>
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
                
                

                </div>
              )
            } 
              <div>

                <StatusLine activePage={activeSlide}/>
                
                <Button onClick={handleNext} type='button' className={`w-full ${activeSlide !== 3 ? "flex items-center" :"hidden!"}  py-5 text-base tracking-wide text-white rounded-lg font-normal mt-3 cursor-pointer bg-main hover:bg-main/90 transition-all duration-200 ease-in-out`}>
                  Next
                </Button>

              </div>
                <Button type='submit' disabled={isLoading} className={`w-full ${activeSlide === 3 ? "flex items-center" :"hidden!"}  py-5 text-base tracking-wide text-white rounded-lg font-normal mt-3 cursor-pointer bg-main hover:bg-main/90 transition-all duration-200 ease-in-out`}>
                  {isLoading ?(
                    'Creating...'
                  ):
                  "Create Account"
                }
                </Button>

          </form>
        </Form>
        )
      }
      <p className=' text-black/70 text-xs tracking-wide'>By signing up, you agree to our <span className='text-main underline'>Terms of Service</span> and <span className='text-main underline'>Privacy Policy</span></p>
      {
        !isVerificationOpen && (
          <p className='text-black/70 border-t border-black/20 px-3 text-xs tracking-wide'>Already have an account ? <Link to='/sign-in' className='text-main underline'>Sign-In</Link></p>
        )
      }
    </main>

  )
}