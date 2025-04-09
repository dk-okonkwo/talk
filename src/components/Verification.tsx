import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react"




const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function Verification() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Cleanup timeout
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const resendOTP = () => {
    setTimeLeft(30);
    setCanResend(false);
  };


  function onSubmit(data: z.infer<typeof FormSchema>) {
     console.log(data)
     setIsLoading(true)
     try {
      
     } catch (error) {
      console.log(error)
     } finally{
      setIsLoading(false)
     }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between">

        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="mt-6 flex w-full flex-col items-center gap-6">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
              <InputOTP value={field.value} onChange={field.onChange} maxLength={6} autoFocus inputMode="numeric" > 
                  <InputOTPGroup className="flex gap-2 justify-between w-full *:border  *:text-xl *:size-10 *:rounded-md">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <Button type="submit" disabled={isLoading} className={'w-full tracking-wide text-white rounded-full mt-3 bg-main'}>Submit</Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full  space-y-2">
          <p className="text-grey-150 dark:text-dark-grey-150 text-sm tracking-wide text-center">Didn&apos;t get the code ?<br/></p>
          <Button variant={'outline'}  disabled={!canResend} onClick={resendOTP} className="w-full bg-secondary text-sm font-medium"> {canResend ? 'Resend code' :`Resend code in ${timeLeft}s`}</Button>
        </div>
      </form>
    </Form>
  )
}
