<template>
  <div id="app">
    <header>
      <img src="@/assets/zap-cannon-logo.svg" alt="Logo" />

      <div id="close" @click="exit">
        <svg viewBox="0 0 100 100" width="100%" x="0px" y="0px">
          <g>
            <line x1="0" y1="0" x2="100" y2="100" />
            <line x1="0" y1="100" x2="100" y2="0" />
          </g>
        </svg>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class App extends Vue {
  devices = [];
  async created() {}
  move(direction: string = "x", amount: number): void {
    let command: string = "G0";
    if (direction.toLowerCase() === "x") {
      command = `G0 X${amount}`;
    } else {
      command = `G0 Y${amount}`;
    }
  }
  exit() {
    ipcRenderer.send("exit");
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/reset.scss";
@import "@/assets/styles/variables.scss";
body {
  background: $main-color;
  background: linear-gradient(to bottom right, $main-color, lighten($main-color, 8));
  background-size: cover;
  background-repeat: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &:after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 75%;
    background: radial-gradient(farthest-side at 50% 0, lighten($main-color, 20), transparent 100%);
    opacity: 0.1;
  }
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  height: 50px;
  display: flex;
  padding-left: 5px;
  -webkit-app-region: drag;
  z-index: 100;
  img {
    height: 100%;
    width: auto;
    margin-right: auto;
    margin-top: 5px;
  }
}
header + * {
  flex: 1;
}
#close {
  position: relative;
  -webkit-app-region: no-drag;
  width: 55px;
  padding: 20px;
  cursor: pointer;
  transition: transform 50ms;

  line {
    stroke-width: 8;
    stroke: white;
  }

  &:hover {
    transform: scale(1.25);

    line {
      stroke-width: 10;
      stroke: $alarm-color;
    }
  }
}
</style>
