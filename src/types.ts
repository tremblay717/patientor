export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnosisCode {
  code: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Discharge  {
  date:string,
  criteria:string
}

export interface SickLeave {
  startDate: string,
  endDate: string,
}

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
  id: string,
  date: string,
  specialist: string,
  type: string,
  description: string,
  employerName?:string,
  diagnosisCodes?:string[],
  healthCheckRating?: number,
  discharge?:Discharge,
  sickLeave?: SickLeave
}


export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?:Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

