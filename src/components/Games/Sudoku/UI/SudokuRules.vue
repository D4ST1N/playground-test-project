<script setup lang="ts">
import TextBadge from "@/components/UI/TextBadge.vue";
import InformationSection from "@/components/UI/GameInformation/InformationSection.vue";
</script>

<template>
  <v-card-text :class="$style.section">
    <TextBadge>
      Sudoku is a popular logic-based number puzzle that involves filling a 9x9 grid with digits so
      that each column, each row, and each of the nine 3x3 subgrids, known as regions or boxes,
      contain all the digits from 1 to 9. There some areas marked dashed borders. Each of those area
      contains unique digits and sum of all digits in the area. The puzzle starts with some cells
      pre-filled with numbers, and the goal is to fill in the remaining cells following these rules:
    </TextBadge>
    <InformationSection
      title="Grid Size"
      :items="['The Sudoku puzzle is played on a 9x9 grid divided into nine 3x3 regions.']"
    />
    <InformationSection
      title="Digits"
      :items="[
        'Use the digits 1 through 9. Each digit can appear only once in each row, each column, each 3x3 subgrid and dashed area.',
      ]"
    />
    <InformationSection
      title="Pre-filled Cells"
      :items="[
        'At the beginning of the puzzle, some cells already contain numbers. These numbers are the given clues and should not be altered while solving the puzzle.',
      ]"
    />
    <InformationSection
      title="Empty Cells"
      :items="[
        'The remaining cells that do not contain any numbers are to be filled in by the player.',
      ]"
    />
    <InformationSection
      title="Row Rule"
      :items="['Each row must contain all the digits from 1 to 9, without any repetition.']"
    />
    <InformationSection
      title="Column Rule"
      :items="['Each column must contain all the digits from 1 to 9, without any repetition.']"
    />
    <InformationSection
      title="Subgrid Rule"
      :items="[
        'Each of the nine 3x3 subgrids (regions) must contain all the digits from 1 to 9, without any repetition.',
      ]"
    />
    <InformationSection
      title="Area Rule"
      :items="['Each area has unique digits and sum of all digits is given in the area.']"
    />
    <InformationSection
      title="Deductive Logic"
      :items="[
        'Sudoku puzzles should be solvable using only logic and reasoning. Guessing or trial-and-error is not required, and there should be a unique solution for a well-formed Sudoku puzzle.',
      ]"
    />
    <InformationSection
      title="Uniqueness"
      :items="['A valid Sudoku puzzle should have only one possible solution.']"
    />
    <TextBadge>
      To solve a Sudoku puzzle, you need to apply deductive reasoning, logic, and elimination to
      determine the correct numbers that fit into each cell based on the given clues and the rules
      mentioned above. The challenge lies in figuring out the correct placement of numbers while
      ensuring that each digit appears only once in each row, column, and subgrid.
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
