<template>
  <div v-if="formattedArr.length < 1" class="TerminalOutput--Empty">
    <span class="ResponsOutput">Waiting for Connection</span>
  </div>
  <div v-else class="TerminalContainer">
    <div class="Terminal__Actions">
      <button class="Terminal__Action Terminal__Action--unlock" @click="unlock">
        Unlock
      </button>
      <button class="Terminal__Action Terminal__Action--reset">Reset</button>
      <button class="Terminal__Action Terminal__Action--status">Status</button>
    </div>
    <div class="Terminal__Output" v-html="formattedOutput"></div>
    <hr />
    <div class="Terminal__CommandLine">
      <form v-on:submit.prevent="sendCommand" class="Terminal__CommandInput">
        <input
          type="text"
          class="CommandInput"
          placeholder='"$" for help'
          v-model="command"
          :disabled="!connected"
        />
        <button type="submit" class="CommandSend" :disabled="!connected">
          {{ !connected ? ". . ." : "Send" }}
        </button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import { ErrorCode } from "@/scripts/errorCodes";
import { SettingCode } from "@/scripts/settingsCodes";
import { InvertMask, BooleanMask } from "@/scripts/settings.model";
@Component
export default class TerminalOutput extends Vue {
  formattedArr: Array<string> = [];
  command: string = "";

  get connected() {
    let connection = this.$store.getters.getConnection;
    return connection ? true : false;
  }
  get queuedResponse() {
    return this.$store.getters.getQueuedResponses;
  }
  @Watch("queuedResponse", { immediate: true, deep: true })
  onCommandResponse(responseArr: Array<string>, oldVal: Array<string>) {
    if (responseArr !== null && responseArr.length > 0) {
      this.formattedArr.push(this.formatResponse(responseArr[0]));
      this.$store.commit("DEQUEUE_RESPONSE");
    }
  }
  get queuedCommand() {
    return this.$store.getters.getQueuedCommands;
  }
  @Watch("queuedCommand", { immediate: true, deep: true })
  onCommandQueued(commandArr: string, oldVal: string) {
    if (commandArr !== null && commandArr.length > 0) {
      let formatted = `<span class="CommandOutput">${commandArr[0]}</span>`;
      this.formattedArr.push(formatted);
      this.$store.commit("DEQUEUE_COMMAND");
    }
  }

  get formattedOutput() {
    // let formatted = this.output.map(item => this.formatCommand(item));
    return this.formattedArr.join("");
  }
  formatResponse(message: string): string {
    message = message.toLowerCase();
    if (message.includes("grbl v")) {
      return `<span class="ResponsOutput ResponsOutput--start">${message}</span>`;
    } else if (message.includes("ok")) {
      this.$store.commit("PROCESSING", false);
      return `<span class="ResponsOutput ResponsOutput--ok">OK</span>`;
    } else if (message.includes("error")) {
      return `<strong class="ResponsOutput ResponsOutput--error">
          <em>ERROR</em>
          <span>${this.parseErrorCode(message.replace("error:", ""))}</span>
        </strong>`;
    } else if (message.includes("alarm")) {
      return `<strong class="ResponsOutput ResponsOutput--alarm">
          <em>ALARM</em>
          <span>${message.replace("alarm:", "")}</span>
        </strong>`;
    } else if (message[0] === "$") {
      let parsed = this.processSetting(message);
      return `<strong class="ResponsOutput ResponsOutput--setting">
          <em>${parsed.description}</em>
          <span>${parsed.value} ${parsed.units}</span>
        </strong>`;
    } else if (message[0] === "[") {
      return `<span class="ResponsOutput ResponsOutput--feedback">${message}</span>`;
    } else if (message[0] === "<") {
      return `<strong class="ResponsOutput ResponsOutput--status">
          <em>STATUS</em>
          <span>${message.slice(1, message.length - 1)}</span>
        </strong>`;
    } else {
      return `<span class="ResponsOutput">${message}</span>`;
    }
  }
  parseErrorCode(code: string) {
    let _code: number = parseInt(code);
    return new ErrorCode(_code).getCodeDescription();
  }
  processSetting(msg: string) {
    let splitedMsg = msg.split("=");
    let setting = new SettingCode(splitedMsg[0], splitedMsg[1]);
    this.$store.commit("DEFAULT_SETTINGS", false);
    switch (splitedMsg[0]) {
      case "$0":
        this.$store.commit("UPDATE_SETTINGS", { pulseTime: setting.settingValue().value });
        break;
      case "$1":
        this.$store.commit("UPDATE_SETTINGS", { idleDelay: setting.settingValue().value });
        break;
      case "$2":
        this.$store.commit("UPDATE_SETTINGS", { portInvertMask: setting.settingValue().value });
        break;
      case "$3":
        this.$store.commit("UPDATE_SETTINGS", {
          directionInvertMark: setting.settingValue().value
        });
        break;
      case "$4":
        this.$store.commit("UPDATE_SETTINGS", { invertEnablePin: setting.settingValue().value });
        break;
      case "$5":
        this.$store.commit("UPDATE_SETTINGS", { invertLimitPin: setting.settingValue().value });
        break;
      case "$6":
        this.$store.commit("UPDATE_SETTINGS", { invertProbePin: setting.settingValue().value });
        break;
      case "$10":
        this.$store.commit("UPDATE_SETTINGS", { statusReportMask: setting.settingValue().value });
        break;
      case "$11":
        this.$store.commit("UPDATE_SETTINGS", { deviation: setting.settingValue().value });
        break;
      case "$12":
        this.$store.commit("UPDATE_SETTINGS", { arcTolerance: setting.settingValue().value });
        break;
      case "$13":
        this.$store.commit("UPDATE_SETTINGS", { reportInInches: setting.settingValue().value });
        break;
      case "$20":
        this.$store.commit("UPDATE_SETTINGS", { enableSoftLimits: setting.settingValue().value });
        break;
      case "$21":
        this.$store.commit("UPDATE_SETTINGS", { enableHardLimits: setting.settingValue().value });
        break;
      case "$22":
        this.$store.commit("UPDATE_SETTINGS", { enableHomeCycle: setting.settingValue().value });
        break;
      case "$23":
        this.$store.commit("UPDATE_SETTINGS", { homingInvertMask: setting.settingValue().value });
        break;
      case "$24":
        this.$store.commit("UPDATE_SETTINGS", { homingFeedRate: setting.settingValue().value });
        break;
      case "$25":
        this.$store.commit("UPDATE_SETTINGS", { homingSeekRate: setting.settingValue().value });
        break;
      case "$26":
        this.$store.commit("UPDATE_SETTINGS", {
          homingDebounceDelay: setting.settingValue().value
        });
        break;
      case "$27":
        this.$store.commit("UPDATE_SETTINGS", {
          homingPullOffDistance: setting.settingValue().value
        });
        break;
      case "$30":
        this.$store.commit("UPDATE_SETTINGS", { maxSpindleSpeed: setting.settingValue().value });
        break;
      case "$31":
        this.$store.commit("UPDATE_SETTINGS", { minSpindleSpeed: setting.settingValue().value });
        break;
      case "$32":
        this.$store.commit("UPDATE_SETTINGS", { laserMode: setting.settingValue().value });
        break;
      case "$100":
        this.$store.commit("UPDATE_SETTINGS", { xSteps: setting.settingValue().value });
        break;
      case "$101":
        this.$store.commit("UPDATE_SETTINGS", { ySteps: setting.settingValue().value });
        break;
      case "$102":
        this.$store.commit("UPDATE_SETTINGS", { zSteps: setting.settingValue().value });
        break;
      case "$110":
        this.$store.commit("UPDATE_SETTINGS", { xMaxRate: setting.settingValue().value });
        break;
      case "$111":
        this.$store.commit("UPDATE_SETTINGS", { yMaxRate: setting.settingValue().value });
        break;
      case "$112":
        this.$store.commit("UPDATE_SETTINGS", { zMaxRate: setting.settingValue().value });
        break;
      case "$120":
        this.$store.commit("UPDATE_SETTINGS", { xAcceleration: setting.settingValue().value });
        break;
      case "$121":
        this.$store.commit("UPDATE_SETTINGS", { yAcceleration: setting.settingValue().value });
        break;
      case "$122":
        this.$store.commit("UPDATE_SETTINGS", { zAcceleration: setting.settingValue().value });
        break;
      case "$130":
        this.$store.commit("UPDATE_SETTINGS", { xMaxTravel: setting.settingValue().value });
        break;
      case "$131":
        this.$store.commit("UPDATE_SETTINGS", { pulseTime: setting.settingValue().value });
        break;
      case "$132":
        this.$store.commit("UPDATE_SETTINGS", { yMaxTravel: setting.settingValue().value });
        break;
      default:
        break;
    }
    return {
      description: setting.settingDescription(),
      value: setting.settingValue().value,
      units: setting.settingValue().units
    };
  }
  unlock() {
    this.$emit("unlock");
  }
  sendCommand() {
    this.$emit("sendCommand", this.command);
    this.command = "";
  }
}
</script>
<style lang="scss">
/* Make sure styles are not scoped to work with v-html */
@import "@/assets/styles/variables.scss";
.TerminalOutput,
.TerminalOutput--Empty {
  width: 100%;
  padding: 5px;
  margin-bottom: auto;
}
.TerminalOutput--Empty {
  span {
    display: block;
    text-align: center;
    margin-top: 1em;
  }
}
.TerminalContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.Terminal__Actions {
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 100;
}
.Terminal__Action {
  width: calc(33% - 8px);
  outline: none;
  background: transparent;
  padding: 5px 8px;
  font-size: 14px;
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
.CommandOutput,
.ResponsOutput {
  color: white;
  display: block;
  text-align: left;
  text-transform: capitalize;
  font-size: 11px;
  padding: 2px;
  margin-bottom: 1px;
  font-weight: 100;
  opacity: 0.8;
}
.ResponsOutput {
  opacity: 0.5;
  font-size: 12px;
}
.ResponsOutput--ok {
  opacity: 1;
  color: $success-color;
  font-weight: 400;
}
.ResponsOutput--error,
.ResponsOutput--status,
.ResponsOutput--alarm,
.ResponsOutput--setting {
  opacity: 1;
  color: white;
  font-weight: bold;

  em {
    font-style: normal;
    padding: 3px;
    background-color: white;
    font-size: 10px;
    color: darken($main-color, 8);
  }
  span {
    text-transform: capitalize;
  }
}
.ResponsOutput--alarm {
  color: $alarm-color;

  em {
    background-color: $alarm-color;
  }
}
.ResponsOutput--error {
  color: $error-color;

  em {
    background-color: $error-color;
  }
}
.ResponsOutput--status {
  color: $status-color;

  em {
    background-color: $status-color;
  }
}
.ResponsOutput--setting {
  opacity: 1;
  color: $status-color;
  font-style: normal;
  em {
    background-color: $status-color;
  }
  span {
    text-transform: none;
  }
}
.ResponsOutput--feedback {
  opacity: 1;
  color: #ecf0f1;
}
.Terminal__Output {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 8px;
    border: 3px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
.Terminal__CommandInput {
  position: relative;
  width: 100%;
  padding: 0;
  margin-top: auto;
  margin-bottom: 10px;
  z-index: 10;

  .CommandInput {
    position: relative;
    width: 100%;
    padding: 8px 12px;
    padding-right: 50px;
    flex: 1;
    margin-right: 5px;
    background-color: lighten($main-color, 2);
    color: lighten($main-color, 60);
    border: none;
    outline: none;
    border-radius: 50px;

    &::placeholder {
      color: lighten($main-color, 20);
    }
  }
  .CommandSend {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 50px;
    text-align: center;
    height: calc(100% - 10px);
    border: none;
    outline: none;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 100;
    color: white;
    background-color: $accent-color;
    text-shadow: 1px 1px 5px darken($accent-color, 10);
    box-shadow: 0px 3px 13px darken($accent-color, 25);
    font-size: 10px;
    border-radius: 50px;

    &:hover {
      background-color: darken($accent-color, 5);
    }
    &:active {
      background-color: darken($accent-color, 8);
      transform: scale(0.98);
      box-shadow: 0px 0px 0px transparent;
    }
    &:disabled {
      background-color: lighten($main-color, 10);
      box-shadow: none;
      opacity: 0.75;
      cursor: default;
    }
  }
}
</style>
