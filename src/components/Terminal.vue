<template>
  <div v-if="formattedArr.length < 1" class="TerminalOutput--Empty">
    <span class="ResponsOutput">Waiting for Connection</span>
  </div>
  <div v-else class="TerminalOutput" v-html="formattedOutput"></div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ErrorCode } from "@/scripts/errorCodes";
@Component
export default class TerminalOutput extends Vue {
  formattedArr: Array<string> = [];

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
.ResponsOutput--alarm {
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
.ResponsOutput--feedback {
  opacity: 1;
  color: #ecf0f1;
}
</style>
