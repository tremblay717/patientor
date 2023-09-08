import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { lime, purple } from '@mui/material/colors';
import { Dispatch, SetStateAction } from 'react';
import { Patient, Diagnosis } from '../../types';
import { useState } from 'react';
import { log } from 'console';
interface Props {
    patient: Patient,
    showEntry: boolean,
    setShowEntry?: Dispatch<SetStateAction<boolean>>
    diagCodes: Diagnosis[]
}

const AddEntries = (props: Props) => {

    const [date, setDate] = useState<any | null>(null);
    const [type, setType] = useState<any | null>(null);
    const [codes, setCodes] = useState<string[]>([]);
    const [specialist, setSpecialist] = useState<string | null>(null);

    const submit = () => {
        console.log(props.patient.id, date, type, specialist, codes)
    }

    const addCode = () => {
        const codeTag: string = (document.getElementById('code') as HTMLSelectElement).value;
        const findTag = codes.find(code => code === codeTag)!;
        if (!findTag) {
            setCodes(codes.concat([codeTag]));
        }
    }

    return (
        <div style={{ position: 'absolute', top: '15%', left: '40%', backgroundColor: 'white', border: 'solid black 1px', borderRadius: '6px', padding: '2%', height: '60%', width: 'auto' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label >Patient ID:
                    <input id='id' value={props.patient.id} style={{ width: '50%' }} name='id' disabled type="text" />
                </label>
                <label >Date:
                    <input id='id' style={{ width: 'auto' }} onChange={({ target }) => setDate(target.value)} name='date' type="date" />
                </label>
                <label >Type:
                    <input id='id' style={{ width: '30%' }} name='type' type="text" onChange={({ target }) => setType(target.value)} />
                </label>
                <label >Specialist:
                    <input id='id' style={{ width: '30%' }} name='specialist' type="text" onChange={({ target }) => setSpecialist(target.value)} />
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
                <form style={{ display: 'flex', flexDirection: 'column' }}>
                    <select id='code'>
                        {props.diagCodes.map((code: any) => {
                            return (
                                <option key={code.code} value={code.code}>{code.code} - {code.name}</option>
                            )
                        })}
                    </select>
                    <Button style={{ fontSize: '8px', marginTop: '10px', width: '80px' }} color='info' variant='contained' onClick={() => addCode()}>Add code</Button>
                </form>


                {/* "entry": {
        "date": "2023-01-02",
        "type": "Hospital",
        "specialist": "MD House",
        "diagnosisCodes": [
            "M51.2"
        ],
        "description": "Test"
    } */}




                <div style={{ display: 'flex', gap: '5%', marginTop: '20px' }}>
                    <Button variant="contained" onClick={() => submit()}>Submit</Button>
                    <Button variant="contained" color='warning' onClick={() => props.setShowEntry!(false)}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}


export default AddEntries