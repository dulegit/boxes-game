<template>
    <div class="boxes-board__box"
      ref="boardChild"
      @click="boxClicked"
      :style="onHover"
      :class="classObj">
    </div>
</template>

<script>
import { mapGetters} from "vuex"
import * as typeBoxesBoard from "@/store/types/boxesBoard"

export default {
  name: "BoxesBoardBox",
  components: {},
  props: {
    keyArray: Array,
    boxIndex: Number
  },
  computed: {
    ...mapGetters({
      isGameStarted: typeBoxesBoard.IS_GAME_START,
      getGeneratedMoves: typeBoxesBoard.GET_LEVEL_GENERATED_ARRAY,
      getPossibleNextMoves: typeBoxesBoard.GET_POSSIBLE_NEXT_MOVES_ARRAY,
      getClickedBoxes: typeBoxesBoard.GET_CLICKED_BOXES
    }),
    onHover: function() {
      return {
        cursor: !this.isGameStarted ? 'pointer' : null
      }
    },
    classObj: function() {
      return {
        done: this.isDoneClass,
        incoming: this.isIncomingClass && !this.isDoneClass && !this.isActiveClass,
        active: this.isActiveClass
      }
    },
    isDoneClass: function() {
      return this.getClickedBoxes.some((n) => { return Number(n[0] + '' + n[1]) === this.boxIndex })
    },
    isIncomingClass: function() {
      return this.getGeneratedMoves.some((n) => { return Number(n[0] + '' + n[1]) === this.boxIndex })
    },
    isActiveClass: function() {
      return this.getPossibleNextMoves.some((n) => { return Number(n[0] + '' + n[1]) === this.boxIndex })
    }

  },
  methods: {
    boxClicked() {
      this.$emit('boxClicked', this.keyArray)
    }
  }
}
</script>
