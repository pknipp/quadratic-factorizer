import React, { useState, useEffect } from 'react';
import Mark from './Mark';

const Factor = ({ i, rowsVisible, setRowsVisible, stage, setStage, a, b, c }) => {

    const options = ['choose', '<', '=', '>'];
    const [pair, setPair] = useState('');
    const [pairGrade, setPairGrade] = useState(null);
    const [sum, setSum] = useState('');
    const [sumGrade, setSumGrade] = useState('');
    const [index, setIndex] = useState(0);
    const [indexGrade, setIndexGrade] = useState(null);

    useEffect(() => {
        debugger
        let myPair = pair;
        if (myPair[0] === "(") myPair = myPair.slice(1);
        if (myPair[myPair.length - 1] === ")") myPair = myPair.slice(0,-1);
        myPair = myPair.replace(/ /g,'').split(',').map(char => Number(char));
        const myPairGrade = pair === '' ? null :
        // myPair.length === 2 &&
            myPair[0] * myPair[1] === a * c;
        setPairGrade(myPairGrade);

        const mySumGrade = sum === '' ? null : (myPairGrade && myPair[0] + myPair[1] === sum);
        setSumGrade(mySumGrade);

        let diff = sum - b;
        const myIndexGrade = mySumGrade && index === 2 + Math.sign(diff)
        setIndexGrade(!index ? null : myIndexGrade);
        debugger

        if (myIndexGrade) {
            if (!diff) {
                setStage(3 + (a === 1 ? 3 : 0));
            } else {
                setRowsVisible(rowsVisible + 1);
            }
        }
    }, [pair, sum, index, a, b, c, setStage, setRowsVisible]);

    return (
        <tr>
            <td>
                <input type="text" value={pair} onChange={e => setPair(e.target.value)} />
                <Mark grade={pairGrade} />
            </td>
            <td>
                <input type="number" value={sum} onChange={e => setSum(Number(e.target.value))}  />
                <Mark grade={sumGrade} />
            </td>
            <td>
                sum
                <select value={index} onChange={e => setIndex(Number(e.target.value))}>
                    {options.map((option, index) => (
                        <option key={index} value={index}> {option} </option>
                    ))}
                </select>
                 b
                <Mark grade={indexGrade} />
            </td>
        </tr>
     )
}

export default Factor;
