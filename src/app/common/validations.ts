import { Validators } from '@angular/forms'

export const EmailValidation = [Validators.required, Validators.email]
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50),
]
export const OptionalTextValidation = [Validators.minLength(2), Validators.maxLength(50)]
export const RequiredTextValidation = OptionalTextValidation.concat([Validators.required])
export const OneCharValidation = [Validators.minLength(1), Validators.maxLength(1)]
export const USAZipCodeValidation = [
  Validators.required,
  Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
]
export const PEPhoneNumberValidation = [
  Validators.required,
  Validators.pattern(/^(?:\+?51)?\s?\(?\d{1,2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
]
