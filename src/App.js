import React, { useState, useEffect } from "react";
import Mark from './Mark';
import Factor from './Factor';
import Header from './Header';
import gcd from './gcd';

const App = () => {
    const [step, setStep] = useState(0);

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
    const [colsVisible, setColsVisible] = useState(0);

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
        let newBis = [[],[]];
        let gcds = [];
        if (!prod) {
            setStep(0);
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
            setStep(1);
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
        let newAGrade = aResponse === '' ? null : a === aResponse;
        let newBGrade = bResponse === '' ? null : b === bResponse;
        let newCGrade = cResponse === '' ? null : c === cResponse;
        if (newAGrade && newBGrade && newCGrade) setStep(2);
        setAGrade(newAGrade);
        setBGrade(newBGrade);
        setCGrade(newCGrade);
        setRowsVisible(newAGrade && newBGrade && newCGrade ? 1 : 0);
    };
    useEffect(ue1, [aResponse, bResponse, cResponse, a, b, c])

    const ue2 = () => {
        let newPairsResponse = pairsResponse.replace(/ /g,'').slice(1, -1).split(`)(`);
        newPairsResponse = newPairsResponse.map(pair => pair.split(",").sort().map(char => Number(char))).sort();
        let newPairsGrade = !pairsResponse.length ? null : JSON.stringify(newPairsResponse) === JSON.stringify(pairs);
        setPairsGrade(newPairsGrade);
        setSumStringResponse('');
        if (newPairsGrade) setRowsVisible(1);
    };
    useEffect(ue2, [pairsResponse, pairs]);

    const ue3 = () => {
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
        if (newSumStringGrade) setStep(4);
    };
    useEffect(ue3, [sumStringResponse, bis])

    const ue4 = () => {
        let newCoefsGrade = [...coefsGrade];
        let allCorrect = true;
        for (let i = 0; i < newCoefsGrade.length; i++) {
            newCoefsGrade[i] = (coefsResponse[i] === '') ? null : coefsResponse[i] === coefs[i];
            allCorrect = allCorrect && newCoefsGrade[i];
        }
        setCoefsGrade(newCoefsGrade);
        if (allCorrect) setStep(5);
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
        let newSubStringResponse = [...subStringResponse];
        let newSubStringGrade = [...subStringGrade]
        let bothCorrect = true;
        for (let i = 0; i < newSubStringGrade.length; i++) {
            newSubStringGrade[i] = (newSubStringResponse[i] === '') ? null : newSubStringResponse[i] === subString[i];
            bothCorrect = bothCorrect && newSubStringGrade[i];
        }
        setSubStringGrade(newSubStringGrade);
        if (bothCorrect) setStep(6);
    }
    useEffect(ue5, [subStringResponse, subString])


    const ue6 = () => {
        let newFactoredStringResponse = "(" + factoredStringResponse.replace(/ /g,'').slice(1,-3).split(")(").sort().join(")(") + ")=0";
        let newFactoredStringGrade = factoredStringResponse === '' ? null : newFactoredStringResponse === factoredString;
        setFactoredStringGrade(newFactoredStringGrade);
        if (newFactoredStringGrade) setStep(7);
    }
    useEffect(ue6, [factoredStringResponse, factoredString])

    const ue7 = () => {
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
                        <li> quadratic expression (or "trinomial"): <i>ax</i><sup>2</sup> + <i>bx</i> + <i>c</i></li>
                        <li> quadratic equation: <i>ax</i><sup>2</sup> + <i>bx</i> + <i>c</i> = 0</li>
                    </ul>
                </div>
                <div>You want to "factor" the trinomial into two binomials, so that the equation is in the form (<i>dx</i> + <i>e</i>)(<i>fx</i> + <i>g</i>) = 0.</div>
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
            {step < 1 ? null : <div>
                Here is a particular quadratic equation for you to solve:
                <span>
                    {` ${a === 1 ? "" : a}`}<i>x</i><sup>2</sup>
                    {`${!b ? '' : (b < 0 ? ' - ' : ' + ')}`}
                    {`${(!b || Math.abs(b) === 1) ? '' : Math.abs(b)}`}
                    <i>{`${!b ? '' : 'x'}`}</i>
                    {`${!c ? ''  : (((c < 0) ? " - " : " + ") + Math.abs(c))}`} = 0
                  </span>
                <div>Here are the steps which you should follow in order to factor this.</div>
                <ol>
                    <li>
                        <div>Determine the values of each coefficient of the trinomial.</div>
                        <ul>
                            <li>
                                <i>a</i> = <input className={"short"}
                                    type={"number"} value={aResponse}
                                    onChange={e => setAResponse(Number(e.target.value))}
                                />
                                <Mark grade={aGrade} />
                            </li>
                            <li>
                                <i>b</i> = <input className={"short"}
                                    type={"number"} value={bResponse}
                                    onChange={e => setBResponse(Number(e.target.value))}
                                />
                                <Mark grade={bGrade} />
                            </li>
                            <li><i>c</i> = <input className={"short"}
                                    type={"number"} value={cResponse}
                                    onChange={e => setCResponse(Number(e.target.value))}
                                />
                                <Mark grade={cGrade} />
                            </li>
                        </ul>
                    </li>
                    {step < 2 ? null : <li>
                        <>
                            <div>In this part you will try to find a pair of numbers whose product equals <i>ac</i> and whose sum equals <i>b</i>.
                                {/* <div>List each pair of factors whose product equals <i>ac</i> and whose sum has the same sign as that of <i>b</i>, or whose sum equals zero if <i>b</i> = 0.  (The order of the factors in this pair is irrelevant.) Separate the factors in this pair by a comma, and enclose the pair by parentheses. In order to make the next parts easier, you should list these pairs in some sort of order.  For instance for <i>a</i> = 6, <i>b</i> = -1 and <i>c</i> = -2 you may list these pairs as (1, -12)(2, -6)(3, -4).</div>
                                <p align="center">
                                    <input type="text" className={"long"} value={pairsResponse}
                                        onChange={e => setPairsResponse(e.target.value)}
                                    />
                                    <Mark grade={pairsGrade} />
                                </p> */}
                            </div>
                            {!rowsVisible ? null : <>
                            <p align="center">
                                {step !== 2 ? null :
                                    colsVisible === 0 ?
                                        `Submit
                                            ${rowsVisible === 1 ?
                                                "a pair of factors (separated by a comma)" :
                                                "another pair of factors"
                                            }
                                        whose product equals ac.` :
                                    colsVisible === 1 ? "Determine the sum of this pair." :
                                    "Determine how this sum compares to b."
                                }
                            </p>
                            <table align="center">
                                <thead>
                                    <tr>
                                        <Header col={0} colsVisible={colsVisible} rowsVisible={rowsVisible}
                                            strings={["pair of", "factors", "of ", "ac"]}
                                        />
                                        <Header col={1} colsVisible={colsVisible} rowsVisible={rowsVisible}
                                            strings={["sum of", "these", "numbers",""]}
                                        />
                                        <Header col={2} colsVisible={colsVisible} rowsVisible={rowsVisible}
                                            strings={["comparison", "of sum", "with ", "b"]}
                                        />
                                    </tr>
                                </thead>
                                <tbody>
                                    {new Array(rowsVisible).fill(0).map((blah, i) => (
                                        <Factor
                                            key={i}
                                            i={i}
                                            rowsVisible={rowsVisible}
                                            colsVisible={colsVisible}
                                            setRowsVisible={setRowsVisible}
                                            setColsVisible={setColsVisible}
                                            step={step}
                                            setStep={setStep}
                                            prod={a * c}
                                            a={a}
                                            b={b}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            </>}
                            {step > 2 ? "Because you've now found a pair of factors whose sum equals " : null}
                            <i>{step > 2 ? "b" : null}</i>
                            {step > 2 ? ", you may proceed to the next step." : null}
                        </>
                    </li>}
                    {step < 3 || a === 1 ? null : <li>
                        Rewrite the middle term of the quadratic expression in terms of the sum of the two factors which you just found:
                        <p align="center">
                            {`${a}`}<i>x</i><sup>2</sup> +
                            (<input className={"medium"} value={sumStringResponse}
                                onChange={e => setSumStringResponse(e.target.value)}
                            />)<i>x</i>
                            {c < 0 ? " - " : " + "}{`${Math.abs(c)}`} = 0
                            <Mark grade={sumStringGrade} />
                        </p>
                    </li>}
                    {step < 4 || a === 1 ? null : <li>
                        Rewrite the entire quadratic expression in the same order as in the previous step, but grouping the first terms and the last two terms separately:
                        <p align="center">(<input className={"short"} type={"number"} value={coefsResponse[0]} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[0] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />
                        <i>x</i><sup>2</sup>
                        <Mark grade={coefsGrade[0]} />
                         + <input className={"short"} type={"number"} value={coefsResponse[1]} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[1] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />
                        <i>x</i>
                        <Mark grade={coefsGrade[1]} />
                        ) +
                        {/* </p><p align="center"> */}
                            (<input className={"short"} type={"number"} value={coefsResponse[2]} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[2] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />
                        <i>x</i><Mark grade={coefsGrade[2]} /> + <input type={"number"} value={coefsResponse[3]} className={"short"} onChange={e => {
                            let newCoefsResponse = [...coefsResponse];
                            newCoefsResponse[3] = Number(e.target.value);
                            setCoefsResponse(newCoefsResponse);
                        }} />)<Mark grade={coefsGrade[3]} /> = 0 </p>
                    </li>}
                    {step < 5 || a === 1 ? null : <li>
                        Rewrite the entire quadratic expression in the same order as in the previous step, but factoring the first grouping and the second grouping separately, ie by factoring out the GCF of the first pair of factors and then factoring out the GCF of the second pair. Keep the coefficient of <i>x</i> positive in each binomial.  [For example 4<i>x</i><sup>2</sup> - 3<i>x</i> would become <i>x</i>(4<i>x</i> - 3), and -4<i>x</i> + 2 would become -2(2<i>x</i> - 1).]
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
                    {step < 6 ? null : <li>
                        <div>Enter the factored form of the quadratic equation below, using <i>x</i>, integers, and the following symbols: + - ) ( =  .</div>
                        <p align="center">
                            <input className={"long"} type="text" value={factoredStringResponse}
                                onChange={e => setFactoredStringResponse(e.target.value)}
                            />
                            <Mark grade={factoredStringGrade} />
                        </p>
                    </li>}
                    {step < 7 ? null : <li>
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
