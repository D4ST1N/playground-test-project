<script setup lang="ts">
import TextBadge from "@/components/UI/TextBadge.vue";
import InformationSection from "@/components/UI/GameInformation/InformationSection.vue";
</script>

<template>
  <v-card-text :class="$style.section">
    <TextBadge>
      Minesweeper is a classic single-player puzzle game that involves uncovering hidden mines on a
      rectangular grid. The objective of the game is to clear the entire grid without detonating any
      mines. Here are the rules for playing Minesweeper
    </TextBadge>
    <InformationSection
      title="Game Setup"
      :items="[
        'The game is played on a rectangular grid, typically ranging in size from 9x9 to 16x30 or larger.',
        'The grid contains hidden mines randomly placed throughout the cells.',
        'Each cell on the grid is either empty or contains a hidden mine.',
      ]"
    />
    <InformationSection
      title="Objective"
      :items="[
        'The objective of the game is to uncover all the cells that do not contain mines without detonating any of the mines.',
      ]"
    />
    <InformationSection
      title="Gameplay"
      :items="[
        'The game starts with the entire grid covered, hiding the contents of each cell, including the location of mines.',
        'The player can select a cell by clicking on it.',
      ]"
    />
    <InformationSection
      title="Cell Contents"
      :items="[
        'If the cell contains a mine, the game is lost, and all the mines are revealed.',
        'TIf the cell is empty and does not have a neighboring mine, it will be cleared, and all adjacent cells will automatically be cleared in a chain reaction.',
        'If the cell is empty but has neighboring mines, it will display a number indicating the count of neighboring mines',
      ]"
    >
      <template #before>
        <TextBadge> When the player selects a cell: </TextBadge>
      </template>
    </InformationSection>
    <InformationSection
      title="Numbers and Hints"
      :items="[
        'Uncovered cells with numbers (1 to 8) indicate the total number of mines in adjacent cells (horizontally, vertically, and diagonally).',
        'This information helps the player deduce the locations of mines and make strategic choices.',
      ]"
    />
    <InformationSection
      title="Flagging Mines"
      :items="[
        'To help keep track of suspected mine locations, players can right-click to place a flag on a cell they believe contains a mine.',
        'Flagging a cell prevents accidental clicking on a suspected mine.',
      ]"
    />
    <InformationSection
      title="Win Condition"
      :items="[
        'The game is won when all cells without mines are successfully uncovered.',
        'When the last safe cell is uncovered, the player wins the game.',
      ]"
    />
    <InformationSection
      title="Lose Condition"
      :items="[
        'The game is lost if the player clicks on a cell containing a mine.',
        'When a mine is detonated, the game ends, and all remaining cells are revealed.',
      ]"
    />
    <InformationSection
      title="Game Variants"
      :items="[
        'Minesweeper can have different difficulty levels, with the number of mines increasing as the grid size increases.',
        'Some versions of Minesweeper may include additional features like time tracking or the ability to mark suspected mines instead of using flags.',
      ]"
    />
    <TextBadge>
      Remember, Minesweeper requires a combination of logic, deduction, and a bit of luck to
      succeed. Take your time, think through your moves, and happy mine-hunting!
    </TextBadge>
  </v-card-text>
  <v-card-text> </v-card-text>
</template>

<style lang="scss" module>
.section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
