<template>
  <div class="SettingsContainer">
    <div v-if="settings" class="Settings">
      <div v-if="!connected" class="Settings__Warning">Default Settings. Connect to Refresh.</div>
      <article class="Setting">
        <strong class="Setting__Title">Laser Mode</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.laserMode" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Step Pulse <span>(μs)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.pulseTime" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Step Idle Delay <span>(ms)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.idleDelay" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Step Port Invert</strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.portInvertMask" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Direction Port Invert</strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.directionInvertMark" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Invert Enable Pin</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.invertEnablePin" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Invert Limit Pins</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.invertLimitPin" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Invert Probe Pin</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.invertProbePin" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Status Report</strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.statusReportMask" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Junction Deviation <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.deviation" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Arc Tolerance <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.arcTolerance" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Report in Inches</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.reportInInches" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Enable Soft Limits</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.enableSoftLimits" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Enable Hard Limits</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.enableHardLimits" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Enable Home Cycle</strong>
        <div class="Setting__Value Setting__Value--toggle">
          <input type="checkbox" id="enablePin" :checked="settings.enableHomeCycle" />
          <label for="enablePin"></label>
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Homing Direction Invert</strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.homingInvertMask" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Homing Feed Rate <span>(mm/min)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.homingFeedRate" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Homing Seek Rate <span>(mm/min)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.homingSeekRate" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Homing Debounce <span>(ms)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.homingDebounceDelay" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Homing Pull-Off <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.homingPullOffDistance" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Max Spindle Speed <span>(RPM)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.maxSpindleSpeed" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Min Spindle Speed <span>(RPM)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.minSpindleSpeed" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">X steps <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.xSteps" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Y steps <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.ySteps" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Z steps <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.zSteps" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">X Max rates <span>(mm/min)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.xMaxRate" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Y Max rate <span>(mm/min)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.yMaxRate" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Z Max rate <span>(mm/min)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.zMaxRate" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">X Acceleration <span>(mm/sec<sup>2</sup>)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.xAcceleration" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Y Acceleration <span>(mm/sec<sup>2</sup>)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.yAcceleration" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Z Acceleration <span>(mm/sec<sup>2</sup>)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.zAcceleration" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">X Max Travel <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.xMaxTravel" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Y Max Travel <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.yMaxTravel" />
        </div>
      </article>

      <article class="Setting">
        <strong class="Setting__Title">Z Max Travel <span>(mm)</span></strong>
        <div class="Setting__Value">
          <input type="text" :value="settings.zMaxTravel" />
        </div>
      </article>

      <div v-if="connected && !processing" class="Settings__Actions">
        <button class="Settings__Action" @click="getSettings">Refresh</button>
        <button class="Settings__Action">Save</button>
      </div>
      <div v-else-if="connected && processing" class="Loading">
        Processing...
      </div>
    </div>
    <div v-else class="Settings__Empty"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Settings extends Vue {
  get settings() {
    return this.$store.getters.getSettings;
  }
  get connected() {
    let connection = this.$store.getters.getConnection;
    return connection ? true : false;
  }
  get showingDefaultSettings() {
    return this.$store.getters.showingDefaultSettings;
  }
  get processing() {
    return this.$store.getters.isProcessing;
  }
  getSettings() {
    this.$emit("settings");
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.ViewportContainer {
  width: 100%;
  height: 100%;
}
.Settings {
  padding: 1em;
}
.Settings__Warning {
  color: $alarm-color;
  font-size: 11px;
  margin-bottom: 1em;
}

.Settings__Actions {
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  z-index: 100;

  .Settings__Warning {
    width: 100%;
  }
}
.Settings__Action {
  width: calc(33% - 8px);
  outline: none;
  background: transparent;
  padding: 5px 8px;
  font-size: 14px;
  margin-left: 10px;
  border: 1px solid white;
  color: white;
  border-radius: 3px;
  opacity: 0.5;
  transform: scale(1);
  transition: opacity 100ms, background 100ms, transform 80ms;
  cursor: pointer;

  &:active {
    opacity: 0.8;
    background: $main-color;
    color: white;
    border-color: transparent;
    transform: scale(0.95);
  }
}
.Setting {
  text-align: left;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  padding: 0;
}
.Setting__Title {
  font-weight: 400;
  font-size: 14px;
  padding: 5px 0;
  margin: 0;
  flex: 1;

  span {
    opacity: 0.7;
    font-size: 10px;
  }
}
.Setting__Value {
  width: 28%;
  margin: 0;

  input {
    width: 100%;
    background: darken($main-color, 5);
    border: 1px solid lighten($main-color, 10);
    outline: none;
    color: white;
    padding: 0 8px;
    height: 30px;
    font-size: 14px;
    margin: 0;
    text-align: center;
    border-radius: 30px;
  }
}
.Setting__Value--toggle {
  position: relative;
  border-radius: 25px;
  height: 30px;
  overflow: hidden;

  input {
    appearance: none;
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0;
    border-radius: 30px;
    background-color: darken($main-color, 5);
    outline: none;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      width: calc(50% - 6px);
      height: calc(100% - 6px);
      top: 3px;
      left: 0;
      transform: translateX(3px);
      border-radius: 30px;
      background: lighten($main-color, 10);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
      transition: all 100ms;
    }
    &:checked {
      background-color: $accent-color;
      &:after {
        left: 100%;
        transform: translateX(-100%) translateX(-3px);
      }
    }
    &:not(:checked) {
      background: darken($main-color, 5);
    }
  }
}
</style>
