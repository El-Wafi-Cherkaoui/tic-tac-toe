let gameBoard = (function Gameboard(){
    let last_change = ""
    let gameboard = new Array(9)
    let get_gameboard = function(){
        return {gameboard}
    }
    let set_gameboard = function(index, player){
        if (!["x", "o"].includes(player.role) || player.role == last_change){

            console.log("Cheating isnt allowed")
            return 0
        }
        gameboard[index-1] = player.role
        last_change = player.role
    }
    let get_last_change = function(){
        return {last_change}
    }
    return {get_gameboard, set_gameboard, get_last_change}

})()

function Player(name,role){
    return {name, role}
}

function Game(player1, player2){

    
    let round = function(player){
        let index = Number(prompt('index'))
        gameBoard.set_gameboard(index, player)
        return gameBoard.get_gameboard()
    }
    let start_game = function(){
        let starter
        let ender 
        let rndm = Math.random()
        if (rndm <= 0.5){
            starter = player1
            ender = player2
        } 
        else{
            starter = player2
            ender = player1
        }
        for (let i=0; i<4; i++){
            round(starter)
            round(ender)
        }
        round(starter)

    }
    return {player1, player2, gameBoard, round, start_game}
}

let p1 = Player('elwafi', "x")
let p2 = Player('ahmed', "o")
let g1 = Game(p1, p2)