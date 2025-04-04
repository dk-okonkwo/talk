
export type GenderOption = "male" | "female"| "other"
export type InstitutionOption = "ins1" | "ins2"| "ins3"

export const UserFormDefaultValues ={
  firstName: "",
  lastName: "",
  country: "",
  phone:"",
  email:"",
  gender : '' as GenderOption,
  institution: "" as InstitutionOption,
  registrationNumber: '',
  password: "",
  confirmPassword: "",
  termsConditionsConsent: false,
  
} 

export const Genders = ['male','female','other']
export const Institutions = ['ins1','ins2','ins3']