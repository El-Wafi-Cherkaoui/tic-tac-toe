const gameboard = (function(){
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    let set_board = function(row, col, sign){
        board[row][col] = sign
    }
    let get_board = ()=>{
        console.log(board)
    }
    let reset_board = ()=>{
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    }
    let check_wins = ()=>{
        let ended = false
        let row = 0
        let diag_1_sum = 0
        let diag_2_sum = 0
        while(row < 3 && !ended){
            let row_sum = 0
            let col_sum = 0
            for (let i = 0; i<3; i++){
                row_sum += board[row][i]
                col_sum += board[i][row]

                if (i == row) {diag_1_sum += board[i][row]}
                if (i + row == 2) {diag_2_sum += board[row][i]}
                console.log('row',row_sum,'col', col_sum);
                // console.log('d1',diag_1_sum,'d2', diag_2_sum);
            }
            let sums = [row_sum, col_sum, diag_1_sum, diag_2_sum]
            sums.forEach(sum => {
                if(sum == 3 || sum == -3){
                    alert('ended')
                    ended = true
                }
            });
            row += 1
        }
        if (ended) return true
        else return false
    }
    return {set_board, get_board,reset_board, check_wins}
})()


function Game(player1, player2){
    let player_I = {player: player1, wins: 0}
    let player_II = {player: player2, wins: 0}
    let game_winner = ''
    let ties_count = 0
    let get_winner = ()=>{
        return game_winner
    }
    let start_game = ()=>{
        while(1){
            start_round()
            if (player_I.wins == 3){
                game_winner = player1
                break
            }
            if (player_II.wins == 3){
                game_winner = player2
                break
            }
        }

    }
    let start_round = ()=>{
        let players = [player_I, player_II]
        for (let i = 0; i<9; i++){
            on_round = players[i%2]
            let row = Number(prompt('enter index of row'))-1
            let col = Number(prompt('enter index of col'))-1
            gameboard.set_board(row,col, on_round.player.get_sign())
            gameboard.get_board()
            let won = gameboard.check_wins()
            if (won) {
                alert(`${on_round.player.name} has won`)
                on_round.wins += 1
                players.splice(i%2,1)
                players[0].wins = 0
                end_turn()
                return 1
            }
        }
        its_tie()
        player_I.wins = 0
        player_II.wins = 0
        alert('its tie')

    }
    let end_turn = ()=>{
        gameboard.reset_board()
        console.log(player_I)
        console.log(player_II)
    }
    let its_tie = ()=>{
        ties_count += 1
    }
    let get_ties = ()=>{
        return ties_count
    }
    
    return {start_game, get_winner, get_ties}
}

function Player(name, sign){
    let player_sign = sign
    if (player_sign  == 'x') {player_sign = 1}
    else if (player_sign == 'o') {player_sign = -1}

    let get_sign = ()=>{
        return player_sign
    }


    return {name, get_sign}
}


let p1 = Player('elwafi', 'x')
let p2 = Player('ahmed', 'o')
let p = Game(p1, p2)
// console.log(gameboard.get_board())
p.start_game()

