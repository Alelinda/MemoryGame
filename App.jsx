import React, { useEffect, useState } from 'react';
import './App.css';

const colors = [
    'red', 'blue', 'green', 'yellow', 'teal',
    'purple', 'orange', 'pink', 'cyan', 'lime'
];

const createDek = () => {
    const doubledColors = [...colors, ...colors] //destrincha p array e opera em cada elemento
    return doubledColors.sort(() => (Math.random() -0.5)) //sorteia uma cor
}

const MemoryGame = () => {
    const [deck, setDeck] = useState(createDek());
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [matched, setMatched] = useState([]);

    useEffect(() => {
        if(flippedIndices.length === 2){ // se clicar duas cores faça tal coisa
            const[firstIndex, secondIndex] = flippedIndices;
            const firstColor = deck[firstIndex]; // 1º cor ser escolhida
            const secondColor = deck[secondIndex]; // 2º cor ser escolhida

            if(firstColor===secondColor){ // se a 1º cor for igual a 2º
                setMatched((prev) =>[// atualize o valor de 'match'
                    ...prev, firstIndex, secondIndex
                ]);
                setFlippedIndices([])
            }else{
                setDisabled(true); // se não volta a desabilitar a carta
                setTimeout(() =>{
                    setFlippedIndices([]);
                    setDisabled(false);
                }, 1000) //1000 milisegundos = 1s. tempo de efeito
            }
        }
    }, [flippedIndices, deck])

    const handleClick = (index) => {
        if(flippedIndices.length < 2 && !flippedIndices.includes
            (index) && !matched.includes(index)){
                setFlippedIndices((prev) => [...prev, index]);
            }
    };

    return(
        <div className='memory-game'>
            <div className='grid'>
                {deck.map((color, index) => (
                    <div key={index}className={`card ${flippedIndices.includes(index)|| matched.includes(index) ? 'flipped': ''

                    }`} 
                    style={{backgroundColor:flippedIndices.includes(index)|| matched.includes(index)?color: 'gray'

                    }}
                    
                    onClick={() => handleClick(index)}
                    /> //self close
                ))}
            </div>
        </div>
    );
};



export default MemoryGame;
