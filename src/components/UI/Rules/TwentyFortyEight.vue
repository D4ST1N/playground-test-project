<template>
  <v-card-text>
    2048 is a popular puzzle game played on a 4x4 grid. The objective of the game is to combine
    numbered tiles to reach the tile with the value of 2048. Here are the rules for playing 2048:
    <v-list>
      <v-list-subheader> Game Setup: </v-list-subheader>
      <v-list-item> The game is played on a 4x4 grid, totaling 16 tiles. </v-list-item>
      <v-list-item>
        Two random tiles with the value of 2 or 4 will appear on the grid at the beginning of the
        game.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Tile Movement: </v-list-subheader>
      <v-list-item>
        You can use arrow keys (up, down, left, right) or W, S, A, D to move all the tiles in the
        grid simultaneously.
      </v-list-item>
      <v-list-item>
        When you make a move, all the tiles on the grid will slide in the chosen direction until
        they reach the edge of the grid or collide with another tile
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Tile Combination: </v-list-subheader>
      <v-list-item>
        When two tiles with the same value collide, they merge into one tile with the value being
        the sum of the two merged tiles.
      </v-list-item>
      <v-list-item>
        For example, two tiles with a value of 2 will merge into a single tile with a value of 4,
        two tiles with a value of 4 will merge into a single tile with a value of 8, and so on.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Scoring: </v-list-subheader>
      <v-list-item>
        Each time you combine tiles, your score increases by the total value of the newly merged
        tile(s).
      </v-list-item>
      <v-list-item>
        For example, if you merge two tiles with a value of 4, you will get 4 points. If you merge
        two tiles with a value of 8, you will get 8 points, and so on.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Tile Generation: </v-list-subheader>
      <v-list-item>
        After each move, a new tile with a value of 2 or 4 will appear on the grid in an empty
        random position.
      </v-list-item>
      <v-list-item>
        The new tile's value is randomly selected between 2 and 4, with 2 being more likely to
        appear.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Game Over: </v-list-subheader>
      <v-list-item>
        The game is over when the 4x4 grid is full of tiles, and there are no more valid moves
        available (i.e., no adjacent tiles with the same value or empty spaces to allow tile
        movement).
      </v-list-item>
      <v-list-item>
        If there are no valid moves and the player has not reached the 2048 tile, the game is lost,
        and the player can choose to start a new game.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Winning: </v-list-subheader>
      <v-list-item>
        The game is won when you successfully create a tile with the value of 2048.
      </v-list-item>
      <v-list-item>
        If you reach the 2048 tile, you have the option to continue playing for a higher score or
        start a new game.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> High Score: </v-list-subheader>
      <v-list-item>
        The game usually keeps track of your highest score achieved during any playthrough. Players
        can try to beat their previous high score in subsequent games.
      </v-list-item>
    </v-list>
    Remember, the key to success in 2048 is careful planning, strategic tile movement, and trying to
    create larger tiles whenever possible. Good luck and have fun playing!
  </v-card-text>
  <v-card-text> </v-card-text>
</template>
