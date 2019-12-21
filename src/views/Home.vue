<template>
  <div class="HomeContainer">
    <main class="WindowVisuals">
      <Viewport />
    </main>
    <aside class="WindowControls">
      <Devices
        :devices="deviceList"
        :showDeviceList="showDeviceList"
        :error="error"
        @showDeviceSelectionWindow="toggleDeviceWindow"
        @getDevices="getDeviceList"
        @connect="connect"
        @disconnect="disconnect"
      />
      <Controls class="Controls" />
      <section class="SideWindow">
        <nav class="SideWindowNav">
          <ul>
            <li
              class="SideWindowNav__Tab"
              :class="{ 'SideWindowNav__Tab--active': currentWindow === 'terminal' }"
              @click="currentWindow = 'terminal'"
            >
              Terminal
            </li>
            <li
              class="SideWindowNav__Tab"
              :class="{ 'SideWindowNav__Tab--active': currentWindow === 'settings' }"
              @click="currentWindow = 'settings'"
            >
              Settings
            </li>
          </ul>
        </nav>
        <div class="Terminal">
          <TerminalOutput
            v-show="currentWindow === 'terminal'"
            ref="outputWindow"
            :connected="connection ? true : false"
            @sendCommand="sanitizeCommand"
            @unlock="unlock"
          />
          <Settings
            v-show="currentWindow === 'settings'"
            class="Settings__Output"
            @settings="querySettings"
          />
        </div>
      </section>
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Model, Vue } from "vue-property-decorator";
import { Serial, PortInfo } from "@/scripts/serial";
import { Observable } from "rxjs";
import Devices from "@/components/Devices.vue";
import Controls from "@/components/Controls.vue";
import Viewport from "@/components/Viewport.vue";
import TerminalOutput from "@/components/Terminal.vue";
import Settings from "@/components/Settings.vue";
@Component({
  components: { TerminalOutput, Controls, Devices, Viewport, Settings }
})
export default class Home extends Vue {
  serialport: Serial = new Serial();
  deviceList: Array<PortInfo> = [];
  showDeviceList: boolean = false;
  error: string | null = null;
  currentWindow: string = "terminal";

  get connection() {
    return this.$store.getters.getConnection;
  }
  get outputWindow() {
    return this.$refs.outputWindow as any;
  }

  mounted() {
    this.getDeviceList();
  }
  toggleDeviceWindow(which: boolean) {
    this.showDeviceList = which;
  }
  getDeviceList(): void {
    this.error = null;
    this.showDeviceList = false;
    this.serialport.listPorts();
    this.deviceList = this.serialport.getDevices();
    if (this.deviceList.length > 0) {
      this.showDeviceList = true;
    }
  }
  connect(device: PortInfo) {
    this.error = null;
    if (this.deviceList.length > 0) {
      this.serialport
        .connect(device)
        .then(res => {
          this.$store.commit("CREATE_CONNECTION", device);
          // subscribe to data events
          if (this.serialport.dataObserver) {
            this.serialport.dataObserver.subscribe(
              data => {
                this.$store.commit("QUEUE_RESPONSE", data);
                this.scrollToBottom();
              },
              error => {
                console.error("something wrong occurred: " + error);
              },
              () => {
                console.log("done");
              }
            );
          }
        })
        .catch(err => {
          this.error = err;
        });
    }
  }

  disconnect() {
    this.error = null;
    if (this.connection) {
      this.serialport
        .disconnect()
        .then(res => {
          this.$store.commit("DESTROY_CONNECTION");
          this.$store.commit("QUEUE_RESPONSE", "<disconnected>");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
  unlock() {
    if (this.connection) {
      this.queueCommand("$X");
    }
  }
  querySettings() {
    if (this.connection) {
      this.$store.commit("PROCESSING", true);
      this.queueCommand("$$");
    }
  }
  sanitizeCommand(command: string) {
    if (command && command.trim() !== "") {
      this.queueCommand(command);
    }
  }
  async queueCommand(command: string) {
    if (this.connection) {
      try {
        let msgSent = await this.serialport.sendMessage(command);
        this.$store.commit("QUEUE_COMMAND", msgSent);
      } catch (err) {
        this.$store.commit("QUEUE_COMMAND", "error: " + err);
      }
    }
  }
  scrollToBottom() {
    if (this.outputWindow) {
      this.outputWindow.$el.scrollTop = this.outputWindow.$el.scrollHeight;
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
.HomeContainer {
  position: relative;
  width: 100%;
  display: flex;
  padding: 20px;
}
.WindowVisuals {
  flex: 1;
  z-index: 1;
}
.WindowControls {
  width: 300px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  z-index: 100;
}
.Controls {
  height: 220px;
}
.SideWindow {
  flex: 1;
  min-width: 200px;
  height: calc(100% - 275px);
  margin-top: 1em;
  background: linear-gradient(to bottom, lighten($main-color, 5), lighten($main-color, 10));
  box-shadow: 0px 13px 34px darken($main-color, 5);
  border-radius: 13px 13px 21px 21px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 2;

  hr {
    border-color: lighten($main-color, 20);
    opacity: 0.5;
    margin: 1em 0;
  }
}
.SideWindowNav {
  background: transparent;
  margin-top: 5px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  li.SideWindowNav__Tab {
    position: relative;
    padding: 5px;
    opacity: 0.5;
    font-weight: 100;
    user-select: none;
    cursor: pointer;
  }
  li.SideWindowNav__Tab--active {
    font-weight: 300;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
    opacity: 1;
    cursor: default;

    &:after {
      content: "";
      position: absolute;
      width: 60%;
      height: 2px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      opacity: 0.8;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
}
.SideWindowNav + * {
  flex: 1;
}
.Terminal {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
}
.Settings__Output {
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
</style>
