/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Masculin" | "Féminin" | "Autre";
  declare type Status = "en attente" | "programmé" | "annulé";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    id: number | string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId: number | string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationDocument: FormData | undefined;
  }
  
  declare type CreateAppointmentParams = {
    patient: number | string;
    primaryPhysician: string;
    reason: string;
    schedule: Date | string;
    status: Status;
    note: string | undefined;
  };
  
  declare type UpdateAppointmentParams = {
    appointmentId: number | string;
    userId: number | string;
    appointment: Appointment;
    type: string;
  };