let  tic_tac_toe = (function(){
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
                    // console.log('row',row_sum,'col', col_sum);
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
        let round_count = 0
        let player_I = {player: player1, round_wins: 0, game_wins: 0}
        let player_II = {player: player2, round_wins: 0, game_wins: 0}
        let game_winner = ''
        let ties_count = 0
        let get_winner = ()=>{
            return game_winner
        }
        let get_player_I = ()=> player_I
        let get_player_II = ()=> player_II
        let start_game = ()=>{
            let gameboard_div = document.querySelectorAll('.gameboard .cell')
            let cell_number = 1
            let row_number = 1
            gameboard_div.forEach(cell => {
                cell.className += ' c'+cell_number
                cell_number += 1
                if(cell_number > 3) {
                    cell_number = 1
                    cell.parentNode.className += ' r'+row_number
                    row_number += 1
                }
                cell.addEventListener('click', (event)=>{
                    let row = event.target.parentNode.className
                    let col = event.target.className
                    row = row.charAt(row.length-1) - 1
                    col = col.charAt(col.length-1) - 1
                    console.log(round_count);
                    start_round(row, col)
                    cell.removeEventListener('click', cell)
                    if (round_count == 9){
                        its_tie()
                        end_turn()
                        player_I.round_wins = 0
                        player_II.round_wins = 0
                        alert('its tie')
                        return 1
                    }
                    
                })
    
    
            });
            // while(1){
            //     start_round()
            // }
    
        }
        let start_round = (row, col)=>{
            let players = [player_I, player_II]
            let on_round = players[round_count%2]
            gameboard.set_board(row,col, on_round.player.get_sign())
            gameboard.get_board()
            let won = gameboard.check_wins()
            if (won) {
                alert(`${on_round.player.name} has won`)
                on_round.round_wins += 1
                players.splice(round_count%2,1)
                players[0].round_wins = 0
                end_turn()
                if (player_I.round_wins == 3){
                    winner(player_I)
                }
                if (player_II.round_wins == 3){
                    winner(player_II)
                }
                return 1
            }
            round_count += 1
            
    
        }
        let end_turn = ()=>{
            round_count = 0
            gameboard.reset_board()
            // console.log(player_I)
            // console.log(player_II)
        }
        let its_tie = ()=>{
            ties_count += 1
        }
        let get_ties = ()=>{
            return ties_count
        }
        let winner = (player)=>{
            player.round_wins = 0
            player.game_wins += 1
            console.log(player);
        }
        
        return {start_game, get_winner, get_ties, get_player_I, get_player_II}
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
})()