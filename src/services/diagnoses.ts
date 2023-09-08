import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getDiagnoses = async () => {
   
    const allCodes = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return allCodes.data
}

export default {
    getDiagnoses
}

