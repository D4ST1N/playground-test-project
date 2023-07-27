<script setup lang="ts">
import TextBadge from "@/components/UI/TextBadge.vue";
import InformationSection from "@/components/UI/GameInformation/InformationSection.vue";
</script>

<template>
  <v-card-text :class="$style.section">
    <TextBadge>
      Tetris is a classic tile-matching puzzle video game where the player must manipulate falling
      blocks called "tetrominoes" to create complete horizontal lines without gaps. The game
      continues to increase in difficulty as more lines are cleared. Here are the rules for playing
      Tetris:
    </TextBadge>
    <InformationSection
      title="Game Setup"
      :items="[
        'The game is played on a rectangular playfield, typically 10 cells wide and 20 cells high.',
        'Tetrominoes are geometric shapes made up of four square blocks connected together. There are seven different tetromino shapes: I, J, L, O, S, T, and Z.',
      ]"
    />
    <InformationSection
      title="Tetromino Movement"
      :items="[
        'The tetrominoes fall from the top of the playfield one at a time.',
        'The player can move the falling tetromino left or right using the arrow keys (or equivalent controls).',
        'The player can also rotate the tetromino clockwise by pressing the appropriate key.',
      ]"
    />
    <InformationSection
      title="Falling Tetrominoes"
      :items="[
        'The falling tetrominoes move downward automatically at a constant speed.',
        'The player can speed up the descent of the tetromino by pressing the downward arrow key.',
      ]"
    />
    <InformationSection
      title="Landing"
      :items="[
        'Once a tetromino cannot move downward any further, it &ldquo;lands&rdquo; and becomes a permanent part of the playfield.',
        'The player can speed up the descent of the tetromino by pressing the downward arrow key.',
      ]"
    />
    <InformationSection
      title="Line Clearing"
      :items="[
        'The player&lsquo;s goal is to complete horizontal lines by filling all the cells in a row.',
        'When a line is completed, it is cleared from the playfield, and all blocks above it move down to fill the space.',
        'Clearing multiple lines simultaneously (1 line, 2 lines, 3 lines, or 4 lines) awards additional points and is known as a &ldquo;single,&rdquo; &ldquo;double,&rdquo; &ldquo;triple,&rdquo; or &ldquo;tetris,&rdquo; respectively.',
      ]"
    />
    <InformationSection
      title="Scoring"
      :items="[
        'The player&lsquo;s score increases with each line cleared.',
        'Points earned from clearing lines may be influenced by the current level or the player&lsquo;s performance.',
      ]"
    />
    <InformationSection
      title="Game Over"
      :items="[
        'The game is over when a new tetromino cannot enter the playfield because it is obstructed by other landed blocks.',
        'The player&lsquo;s final score and level achieved are displayed when the game ends.',
      ]"
    />
    <InformationSection
      title="Increasing Difficulty"
      :items="[
        'As the player clears more lines, the game&lsquo;s speed increases, making it more challenging to manipulate the falling tetrominoes.',
      ]"
    />
    <TextBadge>
      Remember, the key to success in Tetris is to plan your moves strategically, create and clear
      lines efficiently, and adapt to the increasing speed as the game progresses. Happy stacking!
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
