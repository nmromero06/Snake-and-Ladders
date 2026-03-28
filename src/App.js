import './App.css'
import {useState} from 'react'
import boardimg from './snakesandladders.png'
import mepawn from './mepawn.png'
import b1pawn from './b1pawn.png'
import b2pawn from './b2pawn.png'

function App() {
  let title = "Snakes and Ladders"

  const [mypos, setmypos] = useState(1)
  const [bot1pos, setbot1pos] = useState(1)
  const [bot2pos, setbot2pos] = useState(1)
  const [numbots, setnumbots] = useState(1)
  const [message, setmessage] = useState("Press Roll Dice to play!")

  const rolldice = () => {
    return Math.floor(Math.random() * 6) + 1
  }

  const checksnakeladder = (pos) => {
    // Ladders
    if (pos === 1)  { return 38 }
    if (pos === 4)  { return 14 }
    if (pos === 8)  { return 30 }
    if (pos === 21) { return 42 }
    if (pos === 50) { return 69 }
    if (pos === 28) { return 76 }
    if (pos === 71) { return 92 }
    if (pos === 80) { return 99 }
    // Snakes
    if (pos === 36) { return 6 }
    if (pos === 32) { return 10 }
    if (pos === 48) { return 26 }
    if (pos === 62) { return 18 }
    if (pos === 88) { return 24 }
    if (pos === 95) { return 56 }
    if (pos === 97) { return 78 }
    return pos
  }

  const moveplayer = (current, dice) => {
    let newpos = current + dice
    if (newpos > 100) {
      newpos = current
    }
    newpos = checksnakeladder(newpos)
    return newpos
  }

  const resetgame = () => {
    setmypos(1)
    setbot1pos(1)
    setbot2pos(1)
    setmessage("Game reset! Press Roll Dice to play.")
  }

  const switchbots = () => {
    if (numbots === 1) {
      setnumbots(2)
      setmessage("Now playing with 2 bots!")
    } else {
      setnumbots(1)
      setbot2pos(1)
      setmessage("Now playing with 1 bot!")
    }
  }

  const rollandmove = () => {
    let myroll = rolldice()
    let newme = moveplayer(mypos, myroll)

    if (newme === 100) {
      setmypos(newme)
      alert(`You rolled ${myroll} and reached square ${newme}. You win! Congrats!`)
      resetgame()
      return
    }

    let roll1 = rolldice()
    let newbot1 = moveplayer(bot1pos, roll1)

    if (newbot1 === 100) {
      setmypos(newme)
      setbot1pos(newbot1)
      alert(`You rolled ${myroll}, now on square ${newme}. Bot 1 rolled ${roll1} and reached square ${newbot1}. Bot 1 wins!`)
      resetgame()
      return
    }

    let msg = `You rolled ${myroll}, now on square ${newme}. Bot 1 rolled ${roll1}, now on ${newbot1}.`

    if (numbots === 2) {
      let roll2 = rolldice()
      let newbot2 = moveplayer(bot2pos, roll2)

      if (newbot2 === 100) {
        setmypos(newme)
        setbot1pos(newbot1)
        setbot2pos(newbot2)
        alert(`You rolled ${myroll}, now on square ${newme}. Bot 1 rolled ${roll1}, now on ${newbot1}. Bot 2 rolled ${roll2} and reached square ${newbot2}. Bot 2 wins!`)
        resetgame()
        return
      }

      setbot2pos(newbot2)
      msg = msg + ` Bot 2 rolled ${roll2}, now on ${newbot2}.`
    }

    setmypos(newme)
    setbot1pos(newbot1)
    setmessage(msg)
  }

  const getsquarepos = (sq) => {
    let row = Math.floor((sq - 1) / 10)
    let col = (sq - 1) % 10
    if (row % 2 !== 0) {
      col = 9 - col
    }
    let x = (col * 10 + 5) + "%"
    let y = ((9 - row) * 10 + 5) + "%"
    return [x, y]
  }

  const rendertokens = () => {
    let mepos = getsquarepos(mypos)
    let b1pos = getsquarepos(bot1pos)

    let mestyle = {
      left: "calc(" + mepos[0] + " + -6px)",
      top: "calc(" + mepos[1] + " + -6px)",
    }

    let b1style = {
      left: "calc(" + b1pos[0] + " + 6px)",
      top: "calc(" + b1pos[1] + " + -6px)",
    }

    if (numbots === 2) {
      let b2pos = getsquarepos(bot2pos)
      let b2style = {
        left: "calc(" + b2pos[0] + " + 0px)",
        top: "calc(" + b2pos[1] + " + -6px)",
      }

      return (
        <>
          <img src={mepawn} alt="ME" className="token" style={mestyle} />
          <img src={b1pawn} alt="B1" className="token" style={b1style} />
          <img src={b2pawn} alt="B2" className="token" style={b2style} />
        </>
      )
    }

    return (
      <>
        <img src={mepawn} alt="ME" className="token" style={mestyle} />
        <img src={b1pawn} alt="B1" className="token" style={b1style} />
      </>
    )
  }

  return (
    <div className="App">
      <h1>{title}</h1>
      <div className="gamearea">
        <div className="boardwrap">
          <img src={boardimg} alt="Snakes and Ladders board" className="boardimg" />
          <div className="tokenoverlay">
            {rendertokens()}
          </div>
        </div>
        <div className="info">
          <h2>Your position: {mypos}</h2>
          <h2>Bot 1 position: {bot1pos}</h2>
          {numbots === 2 && <h2>Bot 2 position: {bot2pos}</h2>}
          <h3>Number of bots: {numbots}</h3>
          <h3>{message}</h3>
          <button onClick={rollandmove}>Roll Dice</button>
          <button onClick={switchbots}>{numbots === 1 ? "Play vs 2 Bots" : "Play vs 1 Bot"}</button>
          <button onClick={resetgame}>Reset</button>
          <div className="legend">
            <h3>Legend:</h3>
            <h3>🪜 = Ladder (go up!)</h3>
            <h3>🐍 = Snake (slide down!)</h3>
            <h3>ME = You, B1 = Bot 1, B2 = Bot 2</h3>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App
