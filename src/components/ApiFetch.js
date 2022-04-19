
import axios from "axios"
import { useEffect, useState } from "react"


const ApiFetch = () => {

    const [words, setWords] = useState('')
    const [score, setScore] = useState(0)
    const [row, setRow] = useState(1)
    const [column, setColumn] = useState(1)

    useEffect(() => {
        axios({
            url: "https://api.hatchways.io/assessment/sentences/1",
        }).then((response) => {
            setWords(response.data.data.sentence)
        }).catch((error) => {
            if (error.response) {
                console.log('Sorry our API is unable to get the necessary information!')
            }
        })
    }, [])



    const random = (sentence) => {
        return Math.floor(Math.random() * 5 - 2);
    }
    let result = words.replace(/([a-z])([a-z]+)([a-z])/gi, function (s, a, b, c) {
        return a + b.split("").sort(random).join("") + c;
    });

    const wording = words.split(" ");

    const handleInputChange = () => {
        console.log('hello')

    }



    return (
        <div className="container">
            <div className="result">
                <h1>{result}</h1>
                <p>Guess the sentence! Starting typing</p>
                <p>The yellow blocks are meant for spaces</p>
                <p>Score: {score}</p>
            </div>
            <div className="blocks">
                {
                    wording.map((word, i) => (
                        <div className="row" key={i}>
                            {
                                [...word].map(letter => (
                                    <p className="letterBorder">
                                        {letter}
                                    </p>
                                ))
                            }
                            {
                                i === words.length - 1 ? null : <p className="whitespaceBorder"></p>
                            }
                        </div>
                    ))}
            </div>

        </div>

    )
}

export default ApiFetch