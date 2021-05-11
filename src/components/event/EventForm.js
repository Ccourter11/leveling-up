import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "../game/GameProvider.js"



export const EventForm = () => {
    const history = useHistory()

    const { createEvent, getEvents } = useContext(EventContext)

    const { getGames, games } = useContext(GameContext)

    const [currentEvent, setEvent] = useState({
        description: "",
        time: "",
        date: "",
        name: "",
        gameId: 0
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent }
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                    placeholder="Description"
                    onChange={changeEventState}
                    value={currentEvent.description}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                    placeholder="Name"
                    onChange={changeEventState}
                    value={currentEvent.name}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                    placeholder="Time"
                    onChange={changeEventState}
                    value={currentEvent.time}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                    onChange={changeEventState}
                    value={currentEvent.date}/>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        name: currentEvent.name,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        description: currentEvent.description,
                        gameId: parseInt(currentEvent.gameId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}