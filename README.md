# TicTacToe

## Description 
- I will be making a simple game of tic tac toe and applying all the search algorithms(Monte Carlo, Minimax, etc..) to get a better grasp on the concepts. If I can make it on a simple game, I will understand more is my thought process.

## Search Algorithms Implemented Thus Far

- **Minimax (Depth First Search -- Brute Force Algorithm)** - The idea behind it is to look at all possibilities of the game and see if there is a winner, loser, or a tie. What makes this algorithm interesting is that if a game doesn't finish in a terminal state (win/lose/draw), then you need a systematic way to evaluate the game, which is called a heuristic. From research, you can get creative with your heuristic for a game like a tic tac toe, how do you know if someone is winning? Could you give me a mathematical idea or just a level of thought process that can almost guarantee that a computer can follow and win? That's what I find cool about this algorithm because it asks that question.

## Bugs and Fixes

| Bugs        | Fixes           
| ------------- |:-------------:|
| If a game is in progress and is not finished and you start another one, both games override each other.| Once a game is started you aren't allowed to start another until the previous game is complete.|
