<template>
  <div class="ControlsContainer">
    <svg viewBox="0 0 100 100">
      <g class="MovementControls" transform="translate(5, 2)">
        <circle class="MovementBG" cx="50" cy="50" r="32" />
        <g class="MoveButtons" transform="translate(50, 50)" stroke-width="5">
          <g class="HomeBtn" transform="translate(0,0)">
            <rect
              x="0"
              y="0"
              width="5"
              height="5"
              fill="transparent"
              stroke-width="0.75"
              transform="translate(0, -4) rotate(45)"
            />
          </g>
          <g class="MoveBtn" @click="move('top')" transform="translate(-7.5, -27) scale(0.15)">
            <rect x="0" y="0" width="100" height="100" fill="transparent" stroke="none" />
            <polygon class="st0" points="50,29 40,16.5 50,4 60,16.5" />
            <path d="M86.9,72.7c-6,14.5-20.3,24.7-36.9,24.7c-16.7,0-31-10.2-37-24.7" />
            <path d="M71.3,24.1C82.5,31.2,90,43.7,90,58" />
            <path d="M10,58c0-2.4,0.2-4.8,0.6-7.1c2-11.3,8.8-20.9,18.1-26.8" />
          </g>
          <g
            class="MoveBtn"
            @click="move('right')"
            transform="rotate(90) translate(-7.5, -27) scale(0.15)"
          >
            <rect x="0" y="0" width="100" height="100" fill="transparent" stroke="none" />
            <polygon class="st0" points="50,29 40,16.5 50,4 60,16.5 	" />
            <path d="M86.9,72.7c-6,14.5-20.3,24.7-36.9,24.7c-16.7,0-31-10.2-37-24.7" />
            <path d="M71.3,24.1C82.5,31.2,90,43.7,90,58" />
            <path d="M10,58c0-2.4,0.2-4.8,0.6-7.1c2-11.3,8.8-20.9,18.1-26.8" />
          </g>
          <g
            class="MoveBtn"
            @click="move('bottom')"
            transform="rotate(180) translate(-7.5, -27) scale(0.15)"
          >
            <rect x="0" y="0" width="100" height="100" fill="transparent" stroke="none" />
            <polygon class="st0" points="50,29 40,16.5 50,4 60,16.5 	" />
            <path d="M86.9,72.7c-6,14.5-20.3,24.7-36.9,24.7c-16.7,0-31-10.2-37-24.7" />
            <path d="M71.3,24.1C82.5,31.2,90,43.7,90,58" />
            <path d="M10,58c0-2.4,0.2-4.8,0.6-7.1c2-11.3,8.8-20.9,18.1-26.8" />
          </g>
          <g
            class="MoveBtn"
            @click="move('left')"
            transform="rotate(270) translate(-7.5, -27) scale(0.15)"
          >
            <rect x="0" y="0" width="100" height="100" fill="transparent" stroke="none" />
            <polygon class="st0" points="50,29 40,16.5 50,4 60,16.5 	" />
            <path d="M86.9,72.7c-6,14.5-20.3,24.7-36.9,24.7c-16.7,0-31-10.2-37-24.7" />
            <path d="M71.3,24.1C82.5,31.2,90,43.7,90,58" />
            <path d="M10,58c0-2.4,0.2-4.8,0.6-7.1c2-11.3,8.8-20.9,18.1-26.8" />
          </g>
        </g>
      </g>
      <g class="PrecisionControls" transform="translate(0, 5)">
        <g
          class="PrecisionBtn"
          :class="{ 'PrecisionBtn--active': precision === '0.01' }"
          @click="precision = '0.01'"
          transform="translate(10, 45)"
        >
          <circle cx="0" cy="0" r="6" stroke-width="0.5" />
          <text x="-4" y="1.5">0.01</text>
        </g>
        <g
          class="PrecisionBtn"
          :class="{ 'PrecisionBtn--active': precision === '0.10' }"
          @click="precision = '0.10'"
          transform="translate(13, 28)"
        >
          <circle cx="0" cy="0" r="6" stroke-width="0.5" />
          <text x="-4" y="1.5">0.10</text>
        </g>
        <g
          class="PrecisionBtn"
          :class="{ 'PrecisionBtn--active': precision === '1.00' }"
          @click="precision = '1.00'"
          transform="translate(23, 13)"
        >
          <circle cx="0" cy="0" r="6" stroke-width="0.5" />
          <text x="-4" y="1.5">1.00</text>
        </g>
        <g
          class="PrecisionBtn"
          :class="{ 'PrecisionBtn--active': precision === '10.0' }"
          @click="precision = '10.0'"
          transform="translate(38, 5)"
        >
          <circle cx="0" cy="0" r="6" stroke-width="0.5" />
          <text x="-4" y="1.5">10.0</text>
        </g>
      </g>
      <g class="FeedControls" transform="translate(82, 90)">
        <g class="FeedBtn" @click="adjustSpeed(-10)" transform="translate(-10, 3)">
          <circle cx="0" cy="0" r="5" stroke-width="0.75" />
          <text x="-1.75" y="2.5">-</text>
        </g>
        <text class="FeedControls__Title" transform="translate(-4, -2.5)">
          SPEED
        </text>
        <g class="FeedBtn" @click="adjustSpeed(10)" transform="translate(12, -15)">
          <circle cx="0" cy="0" r="5" stroke-width="0.75" />
          <text x="-2.75" y="3.15">+</text>
        </g>
      </g>
    </svg>
  </div>
</template>
<script lang="ts">
enum Precision {
  CENTI = "0.01",
  DECI = "0.10",
  SINGLE = "1.00",
  DECA = "10.0"
}
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class Controls extends Vue {
  precision: Precision = Precision.SINGLE;
  adjustSpeed(amount: number) {
    if (amount < 0) {
      this.$store.commit("DECREASE_SPEED", Math.abs(amount));
    } else {
      this.$store.commit("INCREASE_SPEED", amount);
    }
  }
  move(direction: string) {
    let position = this.$store.getters.getPosition;
    let precision = 0;
    switch (this.precision) {
      case Precision.CENTI:
        precision = 0.01;
        break;
      case Precision.DECI:
        precision = 0.1;
        break;
      case Precision.SINGLE:
        precision = 1.0;
        break;
      case Precision.DECA:
        precision = 10.0;
        break;
    }
    switch (direction) {
      case "left":
        this.$store.commit("UPDATE_POSITION", { x: position.x - precision });
        break;
      case "right":
        this.$store.commit("UPDATE_POSITION", { x: position.x + precision });
        break;
      case "top":
        this.$store.commit("UPDATE_POSITION", { y: position.y + precision });
        break;
      case "bottom":
        this.$store.commit("UPDATE_POSITION", { y: position.y - precision });
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.ControlsContainer {
  position: relative;
  width: 100%;

  svg {
    width: auto;
    height: 100%;
    margin: 0 auto;
  }
}
.MovementBG {
  fill: darken($main-color, 3);
  stroke: darken($main-color, 3);
  stroke-width: 3;
}
.MoveButtons {
  transform: translate(100, 50);
}
.HomeBtn,
.MoveBtn {
  stroke: lighten($main-color, 60);
  fill: none;
  opacity: 0.7;
  cursor: pointer;
  z-index: 100;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.9;
  }
}
.PrecisionBtn {
  stroke: lighten($main-color, 60);
  cursor: pointer;
  opacity: 0.8;
  fill: transparent;

  text {
    stroke: none;
    fill: white;
    font-size: 25%;
    font-weight: 100;
    user-select: none;
  }

  &:hover {
    opacity: 1;
  }
  &.PrecisionBtn--active {
    fill: $accent-color;
    stroke: $accent-color;
    opacity: 1;
  }
}
.FeedControls {
  .FeedControls__Title {
    font-size: 28%;
    stroke: none;
    fill: white;
    user-select: none;
  }
}
.FeedBtn {
  stroke: lighten($main-color, 60);
  cursor: pointer;
  opacity: 0.8;
  fill: transparent;

  text {
    stroke: none;
    fill: white;
    font-size: 60%;
    font-weight: 100;
    user-select: none;
  }

  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.9;
  }
}
.MoveIcon {
  fill: lighten($main-color, 50);
  stroke: lighten($main-color, 50);
  stroke-width: 0.1;
}
</style>
