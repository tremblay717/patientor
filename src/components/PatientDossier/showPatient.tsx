import { Entry, Patient, Diagnosis } from "../../types"
import { useParams } from 'react-router-dom';
import patientServices from '../../services/patients';
import diagnosesServices from '../../services/diagnoses';
import AddEntries from "../AddEntries/AddEntries";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';

const ShowPatient = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [codes, setCodes] = useState<Diagnosis[] | null>(null);
    const [showEntry, setShowEntry] = useState(false);
    const { id } = useParams();

    useEffect(() => {

        patientServices.getPatient(id!).then(response => 
            setPatient(response)
        )
        diagnosesServices.getDiagnoses().then(response => 
            setCodes(response)
        )
    }, [id]);

    if (!patient) {
        return <div style={{ marginTop: '30px' }}>Patient not found!</div>
    };

    return (
        <div style={{ marginTop: '30px', fontFamily: "Roboto,Helvetica,Arial,sans-serif" }}>
            <h3>Patient: {patient.name}</h3>
            <h5>Date of birth : {patient.dateOfBirth}</h5>
            <h5>Gender: {patient.gender}</h5>
            <h5>SSN: {patient.ssn}</h5>
            <h5>Occupation: {patient.occupation}</h5>
            <br></br>
            {showEntry &&
                <AddEntries patient={patient!} diagCodes={codes!} showEntry={showEntry} setShowEntry={setShowEntry} entries={patient.entries!} />
            }
            <Button variant="contained" onClick={() => setShowEntry(true)}>
                Add New Entry
            </Button>
            <h3>Entries</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {patient.entries!.length > 0 &&
                    patient.entries!.sort((a: any, b: any) => a.date - b.date).map((entry: Entry) => {
                        return (
                            <div key={entry.id} style={{ border: 'solid black 1px', borderRadius: '6px', padding: '1%' }}>
                                <h5>Date: {entry.date}</h5>
                                <h5>Description : {entry.description}</h5>
                                {(entry.diagnosisCodes && entry.diagnosisCodes!.length > 0 && codes!) &&
                                    <div>
                                        <h5>Diagnoses codes:</h5>
                                        <div>
                                            {entry.diagnosisCodes.map((code: string) => {
                                                const data: Diagnosis = codes!.find((item: Diagnosis) => item.code === code)!
                                                return (
                                                    <div key={code}>
                                                        <li >{data.code} - {data.name}</li>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                }

                                {entry.healthCheckRating !== undefined &&
                                    <h5>Health Check Rating: {entry.healthCheckRating}</h5>
                                }
                                <h5>Specialist: {entry.specialist}</h5>
                                <h5>Description : {entry.description}</h5>
                                {entry.employerName &&
                                    <h5>Employer: {entry.employerName}</h5>
                                }
                            </div>)
                    })
                }
            </div>
        </div>
    );
};

export default ShowPatient;