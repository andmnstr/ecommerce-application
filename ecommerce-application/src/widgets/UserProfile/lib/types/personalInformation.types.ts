export interface IPersonalInformationFields {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
}

export enum FormSubmitMessages {
  Success = 'Your data has been succesfully updated.',
  EmailError = 'There is already an existing customer with the provided email.',
  OtherError = 'Something went wrong. Please try again later.',
}
