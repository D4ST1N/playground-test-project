<template>
  <v-card-text>
    Sudoku is a popular logic-based number puzzle that involves filling a 9x9 grid with digits so
    that each column, each row, and each of the nine 3x3 subgrids, known as regions or boxes,
    contain all the digits from 1 to 9. There some areas marked dashed borders. Each of those area
    contains unique digits and sum of all digits in the area. The puzzle starts with some cells
    pre-filled with numbers, and the goal is to fill in the remaining cells following these rules:
    <v-list>
      <v-list-item>
        Grid Size: The Sudoku puzzle is played on a 9x9 grid divided into nine 3x3 regions.
      </v-list-item>
      <v-list-item>
        Digits: Use the digits 1 through 9. Each digit can appear only once in each row, each
        column, each 3x3 subgrid and dashed area.
      </v-list-item>
      <v-list-item>
        Pre-filled Cells: At the beginning of the puzzle, some cells already contain numbers. These
        numbers are the given clues and should not be altered while solving the puzzle.
      </v-list-item>
      <v-list-item>
        Empty Cells: The remaining cells that do not contain any numbers are to be filled in by the
        player.
      </v-list-item>
      <v-list-item>
        Row Rule: Each row must contain all the digits from 1 to 9, without any repetition.
      </v-list-item>
      <v-list-item>
        Column Rule: Each column must contain all the digits from 1 to 9, without any repetition.
      </v-list-item>
      <v-list-item>
        Subgrid Rule: Each of the nine 3x3 subgrids (regions) must contain all the digits from 1 to
        9, without any repetition.
      </v-list-item>
      <v-list-item>
        Deductive Logic: Sudoku puzzles should be solvable using only logic and reasoning. Guessing
        or trial-and-error is not required, and there should be a unique solution for a well-formed
        Sudoku puzzle.
      </v-list-item>
      <v-list-item>
        Uniqueness: A valid Sudoku puzzle should have only one possible solution.
      </v-list-item>
    </v-list>
    To solve a Sudoku puzzle, you need to apply deductive reasoning, logic, and elimination to
    determine the correct numbers that fit into each cell based on the given clues and the rules
    mentioned above. The challenge lies in figuring out the correct placement of numbers while
    ensuring that each digit appears only once in each row, column, and subgrid.
  </v-card-text>
  <v-card-text> </v-card-text>
</template>
