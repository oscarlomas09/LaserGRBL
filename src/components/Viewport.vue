<template>
  <div class="ViewportContainer" ref="container">
    <canvas ref="viewportCanvas" :width="width" :height="height"></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class Viewport extends Vue {
  width: number = 0;
  height: number = 0;
  readonly mainColor: string = "#444e71";
  readonly lighterColor: string = "#bcc6eb";
  readonly sideWindowWidth: number = 300;
  readonly headerHeight: number = 50;
  readonly windowMargin: number = 20;

  get canvas() {
    return this.$refs.viewportCanvas as HTMLCanvasElement;
  }
  get ctx() {
    return this.canvas.getContext("2d");
  }
  get position() {
    return this.$store.getters.getPosition;
  }
  @Watch("position", { deep: true })
  positionChanged(val: string, oldVal: string) {
    this.draw();
  }
  get feedRate() {
    return this.$store.getters.getSpeed;
  }
  @Watch("feedRate", { deep: true })
  speedChanged(val: string, oldVal: string) {
    this.draw();
  }
  mounted() {
    window.addEventListener("resize", this.getBoundingBox);
    this.getBoundingBox();
  }
  getBoundingBox() {
    this.width = window.innerWidth - (this.sideWindowWidth + this.windowMargin * 4);
    this.height = window.innerHeight - (this.headerHeight + this.windowMargin * 2);
    this.$nextTick(() => {
      this.draw();
    });
  }
  adjustXScale(): number {
    return this.width / this.$store.getters.getWidth;
  }
  adjustYScale(): number {
    return this.height / this.$store.getters.getHeight;
  }
  adjustXCordinate(x: number): number {
    return x;
  }
  adjustYCordinate(y: number): number {
    return this.height - y;
  }
  draw() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawGrid();
      this.drawPosition();
      this.drawLabels();
    }
  }
  drawLabels() {
    let feedRate = this.feedRate;
    let position = this.position;
    if (this.ctx) {
      // labels
      this.ctx.font = "12px sans-serif";
      this.ctx.fillStyle =
        position.x > this.$store.getters.getWidth ? "#e74c3c" : this.lighterColor;
      this.ctx.fillText(
        `X: ${position.x.toFixed(2)}`,
        this.adjustXCordinate(10),
        this.adjustYCordinate(10)
      );
      this.ctx.fillStyle =
        position.y > this.$store.getters.getHeight ? "#e74c3c" : this.lighterColor;
      this.ctx.fillText(
        `Y: ${position.y.toFixed(2)}`,
        this.adjustXCordinate(70),
        this.adjustYCordinate(10)
      );
      this.ctx.fillStyle =
        this.feedRate <= 0 || this.feedRate > 250 ? "#e74c3c" : this.lighterColor;
      this.ctx.fillText(
        `Feed: ${feedRate}${this.$store.getters.getUnits}/s`,
        this.adjustXCordinate(130),
        this.adjustYCordinate(10)
      );
    }
  }
  drawPosition() {
    let position = Object.assign({}, this.position);
    position.x = position.x * this.adjustXScale();
    position.y = position.y * this.adjustYScale();
    let radius = 4;
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.adjustXCordinate(position.x) + radius / 2,
        this.adjustYCordinate(position.y) - radius / 2,
        radius,
        0,
        2 * Math.PI,
        false
      );
      this.ctx.fillStyle = "#e74c3c";
      this.ctx.fill();
    }
  }
  drawGrid() {
    let majorGridSize = 50;
    let gridSize = majorGridSize / 10;
    if (this.ctx) {
      // Y Axis
      for (let j = 0; j < this.width; j += gridSize) {
        this.ctx.lineWidth = j % majorGridSize === 0 ? 2 : 1;
        this.ctx.globalAlpha = j % majorGridSize === 0 ? 1 : 0.5;
        this.ctx.strokeStyle = this.mainColor;
        let y = this.adjustXCordinate(j); // flip so that cordinates start at bottom-left
        this.ctx.beginPath();
        this.ctx.moveTo(y, 0);
        this.ctx.lineTo(y, this.height);
        this.ctx.stroke();
        this.ctx.closePath();
      }
      // X Axis
      for (let i = 0; i < this.height; i += gridSize) {
        this.ctx.lineWidth = i % majorGridSize === 0 ? 2 : 1;
        this.ctx.globalAlpha = i % majorGridSize === 0 ? 1 : 0.5;
        this.ctx.strokeStyle = this.mainColor;
        let x = this.adjustYCordinate(i); // flip so that cordinates start at bottom-left
        this.ctx.beginPath();
        this.ctx.moveTo(0, x);
        this.ctx.lineTo(this.width, x);
        this.ctx.stroke();
        this.ctx.closePath();
      }
      // Major Axis
      this.ctx.lineWidth = 3;
      this.ctx.globalAlpha = 1;
      this.ctx.strokeStyle = this.lighterColor;
      this.ctx.beginPath();
      this.ctx.moveTo(this.ctx.lineWidth / 2, 0);
      this.ctx.lineTo(this.ctx.lineWidth / 2, this.height - this.ctx.lineWidth / 2);
      this.ctx.lineTo(this.width, this.height - this.ctx.lineWidth / 2);
      this.ctx.stroke();
      this.ctx.closePath();

      // labels
      this.ctx.font = "12px sans-serif";
      this.ctx.fillStyle = this.lighterColor;
      this.ctx.fillText(
        `${this.$store.getters.getWidth} ${this.$store.getters.getUnits}`,
        this.width - 50,
        this.height - 12
      );
      this.ctx.save();
      this.ctx.translate(12, 50);
      this.ctx.rotate(-Math.PI / 2);
      this.ctx.fillText(`${this.$store.getters.getHeight} ${this.$store.getters.getUnits}`, 0, 10);
      this.ctx.restore();
    }
  }
  beforeDestroy() {
    window.removeEventListener("resize", this.getBoundingBox);
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.ViewportContainer {
  width: 100%;
  height: 100%;
}
</style>
