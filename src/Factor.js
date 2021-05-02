import React, { useState, useEffect } from 'react';
import Mark from './Mark';

const Factor = ({ i, rowsVisible, colsVisible, setRowsVisible, setColsVisible, step, setStep, prod, a, b }) => {

    const options = ['choose', '<', '=', '>'];
    const [pairResponse, setPairResponse] = useState('');
    const [pairArray, setPairArray] = useState([]);
    const [pairGrade, setPairGrade] = useState(null);
    const [sumResponse, setSumResponse] = useState('');
    const [sumGrade, setSumGrade] = useState('');
    const [indexResponse, setIndexResponse] = useState(0);
    const [indexGrade, setIndexGrade] = useState(null);

    const ue0 = () => {
        console.log(typeof(pairResponse));
        let newPairArray = pairResponse.replace(/ /g,'').split(',').map(char => Number(char));
        setPairArray(newPairArray);
        const newPairGrade = pairResponse === '' ? null : newPairArray[0] * newPairArray[1] === prod;
        setPairGrade(newPairGrade);
        setColsVisible(newPairGrade ? 1 : 0);
    }
    useEffect(ue0, [pairResponse, prod]);

    const ue1 = () => {
        const newSumGrade = sumResponse === '' ? null : (pairGrade && pairArray[0] + pairArray[1] === Number(sumResponse));
        setSumGrade(newSumGrade);
        if (newSumGrade) setColsVisible(2);
    }
    useEffect(ue1, [sumResponse, prod, b]);

    const ue2 = () => {
        let diff = Number(sumResponse) - b;
        const newIndexGrade = sumGrade && indexResponse === 2 + Math.sign(diff)
        setIndexGrade(!indexResponse ? null : newIndexGrade);
        if (newIndexGrade) {
            if (!diff) {
                setStep(3 + (a === 1 ? 3 : 0));
            } else {
                setColsVisible(0);
                setRowsVisible(rowsVisible + 1);
            }
        }
    };
    useEffect(ue2, [indexResponse]);

    return (
        <tr>
            <td>
                <input type="text" className={"medium"} value={pairResponse} onChange={e => setPairResponse(e.target.value)} />
                <Mark grade={pairGrade} />
            </td>
            {i === rowsVisible - 1 && colsVisible < 1 ? null : <td>
                <input type="number" className={"short"} value={sumResponse} onChange={e => setSumResponse(e.target.value === '' ? '' : Number(e.target.value))}  />
                <Mark grade={sumGrade} />
            </td>}
            {i === rowsVisible - 1 && colsVisible < 2 ? null : <td>
                sum
                <select value={indexResponse} onChange={e => setIndexResponse(Number(e.target.value))}>
                    {options.map((option, index) => (
                        <option key={index} value={index}> {option} </option>
                    ))}
                </select>
                 <i>b</i>
                <Mark grade={indexGrade} />
            </td>}
        </tr>
     )
}

export default Factor;
