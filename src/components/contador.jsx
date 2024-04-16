import { useState, useEffect } from "react";

const Contador = ({ NewValue }) => {
    const [valor, setValor] = useState(0);

    useEffect(() => {
        NewValue(valor);
    }, [valor, NewValue]);

    return (
        <>
            <div className="flex items-center h-1/2 justify-center w-1/2">
                <button
                    className="size-10 bg-red-700 rounded-md hover:bg-red-600"
                    onClick={() => setValor(valor + 1)}>
                    +
                </button>
                <input
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={valor}
                    onChange={(e) => setValor(parseInt(e.target.value, 10))}
                />
                <button
                    className="size-10 bg-red-700 rounded-md hover:bg-red-600"
                    onClick={() => setValor(valor - 1)}
                >
                    -
                </button>
            </div>
        </>
    );
}

export default Contador;