
export type GenderOption = "male" | "female"| "other"
export type levels = "100" | "200" | "300" | "400" | "500" | "graduate"

export const UserFormDefaultValues ={
  first_name: "",
  last_name: "",
  phone:"",
  email:"",
  gender : '' as GenderOption,
  university: "" ,
  password: "",
  confirmPassword: "",
  levels: "" as levels,
  policy: false,
  state:'',
  registration_number: "",
} 
export const UserSignInFormDefaultValues ={
  email:"",
  password: "",
  rememberMeConsent: false,
  
} 

export const Genders = ['male','female','other']
export const levels = ['100','200','300','400','500','graduate']