import { Patient } from "../../types"
import { useParams } from 'react-router-dom';
import patientServices from '../../services/patients'
import { useEffect, useState } from "react";
interface PatientProps {
    patients: Patient[]
}

const ShowPatient = (props: PatientProps) => {
    const [patient, setPatient] = useState(null) as any;
    const id: string = useParams().id!;
    const statePatient: Patient = props.patients.find(patient => patient.id === id)!;

    useEffect(() => {
        patientServices.getPatient(id).then(
            response => {
                setPatient(response)
            }
        )
    },[])

    if (!patient) {
        return <div style={{ marginTop: '30px' }}>Patient not found!</div>
    }
    return (
        <div style={{ marginTop: '30px', fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
            <h3>Patient: {patient.name}</h3>
            <h5>Date of birth : {patient.dateOfBirth}</h5>
            <h5>Gender: {patient.gender}</h5>
            <h5>Occupation: {patient.occupation}</h5>
        </div>
    )
}

export default ShowPatient;