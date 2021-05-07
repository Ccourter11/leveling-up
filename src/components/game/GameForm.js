import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */

    const changeGameState = (event) => {
        const newGameState = { ...currentGame } 
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState) 
    }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                    placeholder="Description"
                    onChange={changeGameState}
                    value={currentGame.description}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                    placeholder="Number of Players"
                    onChange={changeGameState}
                    value={currentGame.numberOfPlayers}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                    placeholder="Skill Level"
                    onChange={changeGameState}
                    value={currentGame.skillLevel}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                    placeholder="Maker"
                    onChange={changeGameState}
                    value={currentGame.maker}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Type of Game: </label>
                     <select value={currentGame.gameTypeId} id="gameTypeId" className="form-control" onChange={changeGameState}>
                        <option value="0">Select a type</option>
                        {gameTypes.map(gt => (
                             <option key={gt.id} value={gt.id}>
                            {gt.label}
                            {/* because this is react, im looping over something and creating a jsx element, i do need a key, a key needs to be a unquie identifier bc we already have an id that acts like a unique identifier, we use the id as the key. the value of of option tag is going to beid bc thats what we want to capture and then what the user sees is going to be the name  */}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}