import { useState } from 'react';


const Calcular = ({handleCalculate}) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

    

    return (
        <div>
            <input type="number" className='b' value={num1} onChange={(e) => setNum1(e.target.value)} />
            <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
            <button onClick={()=> handleCalculate(num1 * num2)}>Calcular</button>
        </div>
    );
};

export default Calcular;