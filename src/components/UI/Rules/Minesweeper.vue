<template>
  <v-card-text>
    Minesweeper is a classic single-player puzzle game that involves uncovering hidden mines on a
    rectangular grid. The objective of the game is to clear the entire grid without detonating any
    mines. Here are the rules for playing Minesweeper:
    <v-list>
      <v-list-subheader> Game Setup: </v-list-subheader>
      <v-list-item>
        The game is played on a rectangular grid, typically ranging in size from 9x9 to 16x30 or
        larger.
      </v-list-item>
      <v-list-item>
        The grid contains hidden mines randomly placed throughout the cells.
      </v-list-item>
      <v-list-item> Each cell on the grid is either empty or contains a hidden mine. </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Objective: </v-list-subheader>
      <v-list-item>
        The objective of the game is to uncover all the cells that do not contain mines without
        detonating any of the mines.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Gameplay: </v-list-subheader>
      <v-list-item>
        The game starts with the entire grid covered, hiding the contents of each cell, including
        the location of mines.
      </v-list-item>
      <v-list-item> The player can select a cell by clicking on it. </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Cell Contents: </v-list-subheader>
      <v-list-item> When the player selects a cell: </v-list-item>
      <v-list-item>
        <v-list>
          <v-list-item>
            If the cell contains a mine, the game is lost, and all the mines are revealed.
          </v-list-item>
          <v-list-item>
            If the cell is empty and does not have a neighboring mine, it will be cleared, and all
            adjacent cells will automatically be cleared in a chain reaction.
          </v-list-item>
          <v-list-item>
            If the cell is empty but has neighboring mines, it will display a number indicating the
            count of neighboring mines.
          </v-list-item>
        </v-list>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Numbers and Hints: </v-list-subheader>
      <v-list-item>
        Uncovered cells with numbers (1 to 8) indicate the total number of mines in adjacent cells
        (horizontally, vertically, and diagonally).
      </v-list-item>
      <v-list-item>
        This information helps the player deduce the locations of mines and make strategic choices.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Flagging Mines: </v-list-subheader>
      <v-list-item>
        To help keep track of suspected mine locations, players can right-click to place a flag on a
        cell they believe contains a mine.
      </v-list-item>
      <v-list-item> Flagging a cell prevents accidental clicking on a suspected mine. </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Win Condition: </v-list-subheader>
      <v-list-item>
        The game is won when all cells without mines are successfully uncovered.
      </v-list-item>
      <v-list-item> When the last safe cell is uncovered, the player wins the game. </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Lose Condition: </v-list-subheader>
      <v-list-item>
        The game is lost if the player clicks on a cell containing a mine.
      </v-list-item>
      <v-list-item>
        When a mine is detonated, the game ends, and all remaining cells are revealed.
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-subheader> Game Variants: </v-list-subheader>
      <v-list-item>
        Minesweeper can have different difficulty levels, with the number of mines increasing as the
        grid size increases.
      </v-list-item>
      <v-list-item>
        Some versions of Minesweeper may include additional features like time tracking or the
        ability to mark suspected mines instead of using flags.
      </v-list-item>
    </v-list>
    Remember, Minesweeper requires a combination of logic, deduction, and a bit of luck to succeed.
    Take your time, think through your moves, and happy mine-hunting!
  </v-card-text>
  <v-card-text> </v-card-text>
</template>
