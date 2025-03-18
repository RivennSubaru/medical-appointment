export interface Patient {
  userId: number;
  name: string;
  email: string;
  phone: string;
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

export interface Appointment {
  id: number | string;
  patient: Patient | number | string;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  cancellationReason: string | null;
}