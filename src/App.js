import React, { useState, useEffect } from "react";
import Mark from './Mark';
import Factor from './Factor';
import gcd from './gcd';

const App = () => {
    const [stage, setStage] = useState(0);

    const [leadOne, setLeadOne] = useState(true);
    const [pos, setPos] = useState(true);
    const [prod, setProd] = useState('');

    const [a, setA] = useState(1);
    const [b, setB] = useState(null);
    const [c, setC] = useState(null);
    const [bis, setBis] = useState([[],[]]);

    const [aResponse, setAResponse] = useState('');
    const [bResponse, setBResponse] = useState('');
    const [cResponse, setCResponse] = useState('');
    const [aGrade, setAGrade] = useState(null);
    const [bGrade, setBGrade] = useState(null);
    const [cGrade, setCGrade] = useState(null);

    const [pairs, setPairs] = useState([]);
    const [pairsResponse, setPairsResponse] = useState('');
    const [pairsGrade, setPairsGrade] = useState(null);

    const [rowsVisible, setRowsVisible] = useState(0);

    // const [sumString, setSumString] = useState('');
    const [sumStringResponse, setSumStringResponse] = useState('');
    const [sumStringGrade, setSumStringGrade] = useState(null);

    const [coefs, setCoefs] = useState([]);
    const [coefsResponse, setCoefsResponse] = useState(new Array(4).fill(''));
    const [coefsGrade, setCoefsGrade] = useState(new Array(4).fill(null));

    const [subString, setSubString] = useState(new Array(2).fill(''));
    const [subStringResponse, setSubStringResponse] = useState(new Array(2).fill(''));
    const [subStringGrade, setSubStringGrade] = useState(new Array(2).fill(null));

    const [factoredString, setFactoredString] = useState('');
    const [factoredStringResponse, setFactoredStringResponse] = useState('');
    const [factoredStringGrade, setFactoredStringGrade] = useState(null);

    const [solution, setSolution] = useState('');
    const [solutionResponse, setSolutionResponse] = useState('');
    const [solutionGrade, setSolutionGrade] = useState(null);

    const rand = n => Math.floor(n * Math.random());

    const ue0 = () => {
        debugger
        let newBis = [[],[]];
        let gcds = [];
        if (!prod) {
            setStage(0);
        } else {
            newBis[0][1] = (1 + Math.floor(Math.sqrt(prod))) * [1, -1][pos ? 0 : rand(2)];
            newBis[1][1] = (1 + Math.floor(newBis[0][1]/2) + rand(newBis[0][1])) * [1, -1][pos ? 0 : rand(2)];
            newBis[0][0] = 1 + [0, rand(5)][leadOne ? 0 : rand(2)];
            newBis[1][0] = 1 + [0, rand(5)][leadOne ? 0 : rand(2)];
            gcds[0] = gcd(newBis[0][0], newBis[0][1]);
            gcds[1] = gcd(newBis[1][0], newBis[1][1]);
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    newBis[i][j] /= gcds[i];
                }
            }
            setBis(newBis);
            const newA = newBis[0][0] * newBis[1][0];
            const newB = newBis[0][0] * newBis[1][1] + newBis[0][1] * newBis[1][0];
            const newC = newBis[0][1] * newBis[1][1];
            const newFactoredString = [];
            for (const bi of newBis) {
                newFactoredString.push("(" + (bi[0] === 1 ? '' : String(bi[0])) + "x" + (bi[1] > 0 ? "+" : "-") + String(Math.abs(bi[1])) + ")");
            }
            newFactoredString.sort();
            setFactoredString(newFactoredString.join('') + "=0");
            let newPairs;
            if (newB === 0) {
                newPairs = [[Math.sqrt(-newC * newA), -Math.sqrt(-newC * newA)].sort()];
            } else {
                // PAK is confused by the following line.
                let first = newB ? Math.sign(newB * newC) : 1;
                let last = newA * newC / first;
                let facts = [first, last].sort();
                newPairs = [facts];
                for (let i = 2; i <= Math.sqrt(Math.abs(newA * newC)); i++) {
                    if (!(newA * newC % i)) {
                        facts = [first * i, last / i].sort();
                        if (Math.sign(facts[0] + facts[1]) === Math.sign(newB)) newPairs.push(facts);
                    };
                };
            };
            newPairs.sort();
            setPairs(newPairs);
            setStage(1);
            setA(newA);
            setB(newB);
            setC(newC);
            let newSolution = [String(-newBis[0][1]) + ((newBis[0][0] === 1) ? '' : ('/' + String(newBis[0][0])))];
            if (newBis[0][1] !== newBis[1][1] || newBis[0][0] !== newBis[1][0]) newSolution.push(String(-newBis[1][1]) + ((newBis[1][0] === 1) ? '' : ('/' + String(newBis[1][0]))));
            setSolution(newSolution.sort().join(","));
        };
        setRowsVisible(0);
        setAResponse('');
        setBResponse('');
        setCResponse('');
        setAGrade(null);
        setBGrade(null);
        setCGrade(null);
        setPairsResponse('');
        setPairsGrade(null);
        setFactoredStringResponse('');
        setFactoredStringGrade(null);
        setSolutionResponse('');
        setSolutionGrade(null);
    }
    useEffect(ue0, [prod, leadOne, pos]);

    const ue1 = () => {
        debugger
        let newAGrade = aResponse === '' ? null : a === aResponse;
        let newBGrade = bResponse === '' ? null : b === bResponse;
        let newCGrade = cResponse === '' ? null : c === cResponse;
        if (newAGrade && newBGrade && newCGrade) setStage(2);
        setAGrade(newAGrade);
        setBGrade(newBGrade);
        setCGrade(newCGrade);
    };
    useEffect(ue1, [aResponse, bResponse, cResponse, a, b, c])

    const ue2 = () => {
        debugger
        let newPairsResponse = pairsResponse.replace(/ /g,'').slice(1, -1).split(`)(`);
        newPairsResponse = newPairsResponse.map(pair => pair.split(",").sort().map(char => Number(char))).sort();
        let newPairsGrade = !pairsResponse.length ? null : JSON.stringify(newPairsResponse) === JSON.stringify(pairs);
        setPairsGrade(newPairsGrade);
        setSumStringResponse('');
        if (newPairsGrade) setRowsVisible(1);
    };
    useEffect(ue2, [pairsResponse, pairs]);

    const ue3 = () => {
        debugger
        let mySumStringResponse = sumStringResponse.replace(/ /g,'');
        let signs = [1, 1];
        if (mySumStringResponse[0] === '-') {
            signs[0] *= -1;
            mySumStringResponse = mySumStringResponse.slice(1);
        }
        mySumStringResponse = mySumStringResponse.split("-");
        if (mySumStringResponse.length === 1) {
            mySumStringResponse = mySumStringResponse[0].split("+");
        } else {
            signs[1] *= -1;
        }
        for (let i = 0; i < 2; i++) {
            mySumStringResponse[i] = Number(mySumStringResponse[i]) * signs[i];
        }
        let newSumStringGrade = false;
        let newCoefs = [];
        newCoefs[0] = bis[0][0] * bis[1][0];
        newCoefs[3] = bis[0][1] * bis[1][1];
        if (bis[0][0] * bis[1][1] === mySumStringResponse[0] && bis[1][0] * bis[0][1] === mySumStringResponse[1]) {
            newSumStringGrade = true;
            newCoefs[1] = bis[0][0] * bis[1][1];
            newCoefs[2] = bis[1][0] * bis[0][1];
            setCoefs(newCoefs);
        }
        if (bis[0][0] * bis[1][1] === mySumStringResponse[1] && bis[1][0] * bis[0][1] === mySumStringResponse[0]) {
            newSumStringGrade = true;
            newCoefs[2] = bis[0][0] * bis[1][1];
            newCoefs[1] = bis[1][0] * bis[0][1];
            setCoefs(newCoefs);
        }
        setSumStringGrade(sumStringResponse === '' ? null : newSumStringGrade);
        setCoefsResponse(new Array(4).fill(''));
        if (newSumStringGrade) setStage(4);
    };
    useEffect(ue3, [sumStringResponse, bis])

    const ue4 = () => {
        debugger
        let newCoefsGrade = [...coefsGrade];
        let allCorrect = true;
        for (let i = 0; i < newCoefsGrade.length; i++) {
            newCoefsGrade[i] = (coefsResponse[i] === '') ? null : coefsResponse[i] === coefs[i];
            allCorrect = allCorrect && newCoefsGrade[i];
        }
        setCoefsGrade(newCoefsGrade);
        if (allCorrect) setStage(5);
        let gcd0 = gcd(coefs[0], Math.abs(coefs[1]));
        let gcd1 = gcd(Math.abs(coefs[2]), Math.abs(coefs[3])) * Math.sign(coefs[2]);
        let newSubString = [];
        newSubString[0] = `${(gcd0 === 1) ? '' : gcd0}x(${coefs[0]/gcd0 === 1 ? '' : coefs[0]/gcd0}x${coefs[1] < 0 ? "-" : "+"}${Math.abs(coefs[1]/gcd0)})`;
        newSubString[1] = `${(Math.abs(gcd1) === 1) ? (gcd1 > 0 ? '' : '-(') : (gcd1 + '(')}${coefs[2]/gcd1 === 1 ? '' : coefs[2]/gcd1}x${coefs[3]/gcd1 < 0 ? "-" : "+"}${Math.abs(coefs[3]/gcd1)}${gcd1 === 1 ? '' : ')'}`;
        setSubString(newSubString);
        setSubStringResponse(new Array(2).fill(''));
    }
    useEffect(ue4, [coefsResponse, coefs])

    const ue5 = () => {
        debugger
        let newSubStringResponse = [...subStringResponse];
        let newSubStringGrade = [...subStringGrade]
        let allCorrect = true;
        for (let i = 0; i < newSubStringGrade.length; i++) {
            newSubStringGrade[i] = (newSubStringResponse[i] === '') ? null : newSubStringResponse[i] === subString[i];
            allCorrect = allCorrect && newSubStringGrade[i];
        }
        setSubStringGrade(newSubStringGrade);
        if (allCorrect) setStage(6);
    }
    useEffect(ue5, [subStringResponse, subString])


    const ue6 = () => {
        debugger
        let newFactoredStringResponse = "(" + factoredStringResponse.replace(/ /g,'').slice(1,-3).split(")(").sort().join(")(") + ")=0";
        let newFactoredStringGrade = factoredStringResponse === '' ? null : newFactoredStringResponse === factoredString;
        setFactoredStringGrade(newFactoredStringGrade);
        if (newFactoredStringGrade) setStage(7);
    }
    useEffect(ue6, [factoredStringResponse, factoredString])

    const ue7 = () => {
        debugger
        let newSolutionResponse = solutionResponse.replace(/ /g,'').split(",").sort().join(",");
        let newSolutionGrade = newSolutionResponse === '' ? null : solution === newSolutionResponse;
        setSolutionGrade(newSolutionGrade);
    };
    useEffect(ue7, [solutionResponse, solution]);

    return (
        <>
            <div>
                <h4 align="center">Solving a quadratic equation by factoring:</h4>
                <div>Nomenclature:
                    <ul>
                        <li> Quadratic expression: ax<sup>2</sup> + bx + c</li>
                        <li> Quadratic equation: ax<sup>2</sup> + bx + c = 0</li>
                    </ul>
                </div>
                <div>You want to "factor" the expression so that the equation is in the form (dx + e)(fx + g) = 0.</div>
                <div>Your answers to the following three questions will control the difficulty of the quadratic equation which you must solve:</div>
                <ul>
                    <li>
                        Should the coefficient of the expression's leading term be one?
                        {leadOne ? " Yes " : " Maybe "}
                        <button onClick={() => setLeadOne(!leadOne)}>change</button>
                    </li>
                    <li>
                        Should the expression contain any negative signs?
                        {pos ? " No " : " Maybe "}
                        <button onClick={() => setPos(!pos)}>change</button>
                    </li>
                    <li>
                        <div>
                            In order to find the factors of a quadratic expression, you'll first need to find the factors of an integer.
                        </div>
                        <div>
                            Approximately how large of an integer can you comfortably factor?
                            &nbsp;<input className={"short"} onChange={e => setProd(Number(e.target.value))} />
                        </div>
                    </li>
                </ul>
            </div>
            {stage < 1 ? null : <div>
                Here is a particular quadratic equation for you to solve:
                <span>{` ${a === 1 ? "" : a}`}x<sup>2</sup>
                {`${!b ? ' ' : (((b < 0) ? " - " : " + ") + ((b === 1 || b === -1) ? '' : Math.abs(b)) + 'x')}
                  ${!c ? ''  : (((c < 0) ? " - " : " + ") + Math.abs(c))}`} = 0</span>
                <div>Here are the steps which you should follow in order to factor this.</div>
                <ol>
                    <li>
                        <div>Determine the values of each coefficient of the quadratic expression.</div>
                        <ul>
                            <li>
                                a = <input className={"short"}
                                    type={"number"} value={aResponse}
                                    onChange={e => setAResponse(Number(e.target.value))}
                                />
                                <Mark grade={aGrade} />
                            </li>
                            <li>
                                b = <input className={"short"}
                                    type={"number"} value={bResponse}
                                    onChange={e => setBResponse(Number(e.target.value))}
                                />
                                <Mark grade={bGrade} />
                            </li>
                            <li>c = <input className={"short"}
                                    type={"number"} value={cResponse}
                                    onChange={e => setCResponse(Number(e.target.value))}
                                />
                                <Mark grade={cGrade} />
                            </li>
                        </ul>
                    </li>
                    {stage < 2 ? null : <li>
                        <>
                            <div>
                                <div>List each pair of factors whose product equals ac and whose sum has the same sign as that of b, or whose sum equals zero if b = 0.  (The order of the factors in this pair is irrelevant.) Separate the factors in this pair by a comma, and enclose the pair by parentheses. In order to make the next parts easier, you should list these pairs in some sort of order.  For instance for a = 6, b = -1 and c = -2 you may list these as (1, -12)(2, -6)(3, -4).</div>
                                <p align="center">
                                    <input type="text" className={"long"} value={pairsResponse}
                                        onChange={e => setPairsResponse(e.target.value)}
                                    />
                                    <Mark grade={pairsGrade} />
                                </p>
                            </div>
                            {!rowsVisible ? null : <><span>
                                In each of the following rows that appears, list a pair of factors (separated by a comma) whose product equals ac.  In the next columns determine the sum of this pair, and how this sum compares to b.
                            </span>
                            <table align="center">
                                <thead>
                                    <tr>
                                    <th>pair of<br/>factors</th>
                                    <th>sum of<br/>factors</th>
                                    <th>comparison of<br/>sum with b</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {new Array(rowsVisible).fill(0).map((blah, i) => (
                                        <Factor
                                            key={i}
                                            i={i}
                                            rowsVisible={rowsVisible}
                                            setRowsVisible={setRowsVisible}
                                            stage={stage}
                                            setStage={setStage}
                                            a={a}
                                            b={b}
                                            c={c}
                                        />
                                    ))}
                                </tbody>
                            </table></>}
                        </>
                    </li>}
                    {stage < 3 || a === 1 ? null : <li>
                        Rewrite the middle term of the quadratic expression in terms of the sum of the two factors which you just found:
                        <p align="center">
                            {`${a}`}x<sup>2</sup> +
                            (<input className={"medium"} value={sumStringResponse}
                                onChange={e => setSumStringResponse(e.target.value)}
                            />)x
                            {c < 0 ? " - " : " + "}{`${Math.abs(c)}`} = 0
                            <Mark grade={sumStringGrade} />
                        </p>
                    </li>}
                    {stage < 4 || a === 1 ? null : <li>
                        Rewrite the entire quadratic expression in the same order as in the previous step, but grouping the first terms and the last two terms separately:
                        <p align="center">(<input className={"short"} type={"number"} value={coefsResponse[0]} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[0] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />
                        x<sup>2</sup>
                        <Mark grade={coefsGrade[0]} />
                         + <input className={"short"} type={"number"} value={coefsResponse[1]} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[1] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />
                        x
                        <Mark grade={coefsGrade[1]} />
                        ) +
                        {/* </p><p align="center"> */}
                            (<input className={"short"} type={"number"} value={coefsResponse[2]} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[2] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />
                        x<Mark grade={coefsGrade[2]} /> + <input type={"number"} value={coefsResponse[3]} className={"short"} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[3] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />)<Mark grade={coefsGrade[3]} /> = 0 </p>
                    </li>}
                    {stage < 5 || a === 1 ? null : <li>
                        Rewrite the entire quadratic expression in the same order as in the previous step, but factoring the first grouping and the second grouping separately, ie by factoring out the GCF of the first pair of factors and then factoring out the GCF of the second pair. Keep the coefficient of "x" positive in each binomial.  [For example "4x<sup>2</sup> - 3x" would become "x(4x-3)", and "-4x+2" would become "-2(2x-1)".]
                        <p align="center">
                            <input className={"medium"} type={"text"} value={subStringResponse[0]} onChange={e => {
                                let newSubStringResponse = [...subStringResponse];
                                newSubStringResponse[0] = e.target.value;
                                setSubStringResponse(newSubStringResponse);
                            }} />
                            <Mark grade={subStringGrade[0]} />
                            + <input className={"medium"} type={"text"} value={subStringResponse[1]} onChange={e => {
                                let newSubStringResponse = [...subStringResponse];
                                newSubStringResponse[1] = e.target.value;
                                setSubStringResponse(newSubStringResponse);
                            }} />
                            <Mark grade={subStringGrade[1]} />
                            = 0
                        </p>
                    </li>}
                    {stage < 6 ? null : <li>
                        <div>Enter the factored form of the quadratic equation below, using "x", integers, and the following symbols: + - ) ( =  .</div>
                        <p align="center">
                            <input className={"long"} type="text" value={factoredStringResponse}
                                onChange={e => setFactoredStringResponse(e.target.value)}
                            />
                            <Mark grade={factoredStringGrade} />
                        </p>
                    </li>}
                    {stage < 7 ? null : <li>
                        <div>Below enter solutions to this equation as either a number or a comma-separated pair of numbers, each of which is either an integer or an unmixed fraction:</div>
                        <p align="center">
                            <input type={"text"} className={"medium"} value={solutionResponse}
                                onChange={e => setSolutionResponse(e.target.value)}
                            />
                            <Mark grade={solutionGrade} />
                        </p>
                    </li>}
                </ol>
            </div>}
        </>
    );
};

export default App;
