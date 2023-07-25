<template>
  <v-card-text>
    Tetris is a classic tile-matching puzzle video game where the player must manipulate falling
    blocks called "tetrominoes" to create complete horizontal lines without gaps. The game continues
    to increase in difficulty as more lines are cleared. Here are the rules for playing Tetris:
    <v-list>
      <v-list-subheader> Game Setup: </v-list-subheader>
      <v-list-item>
        he game is played on a rectangular playfield, typically 10 cells wide and 20 cells high
      </v-list-item>
      <v-list-item>
        Tetrominoes are geometric shapes made up of four square blocks connected together. There are
        seven different tetromino shapes: I, J, L, O, S, T, and Z.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Tetromino Movement: </v-list-subheader>
      <v-list-item> The tetrominoes fall from the top of the playfield one at a time. </v-list-item>
      <v-list-item>
        The player can move the falling tetromino left or right using the arrow keys (or equivalent
        controls).
      </v-list-item>
      <v-list-item>
        The player can also rotate the tetromino clockwise by pressing the appropriate key.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Falling Tetrominoes: </v-list-subheader>
      <v-list-item>
        The falling tetrominoes move downward automatically at a constant speed.
      </v-list-item>
      <v-list-item>
        The player can speed up the descent of the tetromino by pressing the downward arrow key.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader>Landing: </v-list-subheader>
      <v-list-item>
        Once a tetromino cannot move downward any further, it "lands" and becomes a permanent part
        of the playfield.
      </v-list-item>
      <v-list-item>
        New tetrominoes continue to fall until the playfield is filled or the game is over.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Line Clearing: </v-list-subheader>
      <v-list-item>
        The player's goal is to complete horizontal lines by filling all the cells in a row.
      </v-list-item>
      <v-list-item>
        When a line is completed, it is cleared from the playfield, and all blocks above it move
        down to fill the space.
      </v-list-item>
      <v-list-item>
        Clearing multiple lines simultaneously (1 line, 2 lines, 3 lines, or 4 lines) awards
        additional points and is known as a "single," "double," "triple," or "tetris," respectively.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Scoring: </v-list-subheader>
      <v-list-item> The player's score increases with each line cleared. </v-list-item>
      <v-list-item>
        Points earned from clearing lines may be influenced by the current level or the player's
        performance.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Game Over: </v-list-subheader>
      <v-list-item>
        The game is over when a new tetromino cannot enter the playfield because it is obstructed by
        other landed blocks.
      </v-list-item>
      <v-list-item>
        The player's final score and level achieved are displayed when the game ends.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Increasing Difficulty: </v-list-subheader>
      <v-list-item>
        As the player clears more lines, the game's speed increases, making it more challenging to
        manipulate the falling tetrominoes.
      </v-list-item>
    </v-list>
    Remember, the key to success in Tetris is to plan your moves strategically, create and clear
    lines efficiently, and adapt to the increasing speed as the game progresses. Happy stacking!
  </v-card-text>
  <v-card-text> </v-card-text>
</template>
