import axios from "axios";
import { NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
}
const addEntry = async (patientID: string, entry:NewEntry) => {

  const entryToSave = {
    id: patientID,
    entry: entry
  };

  const {data} = await axios.post(`${apiBaseUrl}/entries`, entryToSave);
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, 
  create,
  getPatient,
  addEntry
};

