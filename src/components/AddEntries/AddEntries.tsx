import { Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Patient, Diagnosis, Discharge, NewEntry, Entry, SickLeave } from '../../types';
import { useState } from 'react';
import patientsServices from '../../services/patients';
interface Props {
    patient: Patient,
    showEntry: boolean,
    setShowEntry: Dispatch<SetStateAction<boolean>>,
    diagCodes: Diagnosis[],
    entries: Entry[]
}

const AddEntries = (props: Props) => {
    const healthArray: any = ["", 1, 2, 3, 4];
    const [notification, setNotification] = useState(false)
    const [date, setDate] = useState<string>("");
    const [type, setType] = useState<string>("null");
    const [codes, setCodes] = useState<string[]>([]);
    const [specialist, setSpecialist] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [employer, setEmployer] = useState<string | null>("");
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
    const [sickleaveStart, setSickLeaveStartDate] = useState<string | null>("");
    const [sickleaveEnd, setSickLeaveEndDate] = useState<string | null>("");

    const submit = () => {
        const healthID: number | string = Number((document.getElementById('health') as HTMLSelectElement).value);
        const dischargeObj: Discharge = {
            date: dischargeDate!,
            criteria: dischargeCriteria!
        };
        const sickLeaveObj: SickLeave = {
            startDate: sickleaveStart!,
            endDate: sickleaveEnd!
        };

        if (date === "" || specialist === "" || type === "" || description === "") {
            setNotification(true)
            setTimeout(() => {
                setNotification(false)
            }, 10000)

        } else {

            const newEntry: NewEntry = {
                date: date,
                type: type,
                specialist: specialist,
                employerName: employer!,
                description: description,
                healthCheckRating: healthID,
                diagnosisCodes: codes,
                discharge: dischargeObj!,
                sickLeave: sickLeaveObj!
            };
            patientsServices.addEntry(props.patient.id, newEntry)
                .then(response => {
                    console.log(response)
                    props.setShowEntry(false)
                    props.entries.push(response)
                }
                )
        }
    }

    const addCode = () => {
        const codeTag: string = (document.getElementById('code') as HTMLSelectElement).value;
        const findTag = codes.find(code => code === codeTag)!;
        if (!findTag) {
            setCodes(codes.concat([codeTag]));
        }
    }

    return (
        <div style={{ position: 'absolute', top: '15%', left: '40%', backgroundColor: 'white', border: 'solid black 1px', borderRadius: '6px', padding: '2%', height: 'auto', width: 'auto' }}>
            {notification &&
                <span style={{color:'red', marginTop:'20px', marginBottom:'50px'}}>Ensure all fields are completed</span>
            }
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label >Patient ID:
                    <input id='id' value={props.patient.id} style={{ width: '50%' }} name='id' disabled type="text" />
                </label>
                <label >Date *:
                    <input id='date' style={{ width: 'auto' }} required onChange={({ target }) => setDate(target.value)} name='date' type="date" />
                </label>
                <label >Type *:
                    <input id='type' style={{ width: '30%' }} name='type' required type="text" onChange={({ target }) => setType(target.value)} />
                </label>
                <label >Specialist:
                    <input id='specialist' style={{ width: '30%' }} name='specialist' type="text" onChange={({ target }) => setSpecialist(target.value)} />
                </label>
                <span>Codes:
                    {codes && codes.length > 0 &&
                        codes.map((code: any) => {
                            return (
                                <li key={code}>{code}</li>
                            )
                        })
                    }
                </span>
                <ul style={{ display: 'flex', flexDirection: 'column', margin: '0px', padding: '0px' }}>
                    <select id='code'>
                        {props.diagCodes.map((code: any) => {
                            return (
                                <option key={code.code} value={code.code}>{code.code} - {code.name}</option>
                            )
                        })}
                    </select>
                    <Button style={{ fontSize: '8px', marginTop: '10px', width: '80px' }} color='info' variant='contained' onClick={() => addCode()}>Add code</Button>
                </ul>
                <label >Description:</label>
                <textarea id='description' style={{ width: '100%', height: '100px' }} name='specialist' onChange={({ target }) => setDescription(target.value)} />
                <label >Employer Name:
                    <input id='employer' style={{ width: '30%' }} name='employer' type="text" onChange={({ target }) => setEmployer(target.value)} />
                </label>
                <label>Health Rating:
                    <select id='health' defaultValue={""} style={{ width: '50px', textAlign: 'center' }}>{
                        healthArray.map((num: number) => {
                            return (
                                <option key={num} value={num}>{num}</option>
                            )
                        })}
                    </select>
                </label>
                <span style={{ display: 'flex', flexDirection: 'column' }}><strong>Discharge:</strong>
                    <label style={{ marginTop: '10px' }}>Date:
                        <input id='dischargeDate' style={{ width: 'auto' }} name='dischargeDate' type="date" onChange={({ target }) => setDischargeDate(target.value)} />
                    </label>
                    <label style={{ marginTop: '10px' }}>Criteria:
                        <input id='dischargeCriteria' style={{ width: '80%' }} name='dischargeCriteria' type="text" onChange={({ target }) => setDischargeCriteria(target.value)} />
                    </label>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column' }}><strong>Sick Leave:</strong>
                    <label style={{ marginTop: '10px' }}>Start Date:
                        <input id='sickleaveStart' style={{ width: 'auto' }} name='sickStart' type="date" onChange={({ target }) => setSickLeaveStartDate(target.value)} />
                    </label>
                    <label style={{ marginTop: '10px' }}>End Date:
                        <input id='sickleaveEnd' style={{ width: 'auto' }} name='sickEnd' type="date" onChange={({ target }) => setSickLeaveEndDate(target.value)} />
                    </label>
                </span>
                <div style={{ display: 'flex', gap: '5%', marginTop: '20px' }}>
                    <Button variant="contained" onClick={() => submit()}>Submit</Button>
                    <Button variant="contained" color='warning' onClick={() => props.setShowEntry!(false)}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}


export default AddEntries