<template>
  <div class="DevicesContainer">
    <span v-if="error" class="Error">{{ error }}</span>
    <div class="CurrentDevice" @click="$emit('showDeviceSelectionWindow', !showDeviceList)">
      <span>{{ selected.path }}</span> <i class="CurrentDevice__downArrow"></i>
    </div>
    <article class="Devices" v-show="showDeviceList">
      <div
        class="DeviceOption"
        v-for="(device, idx) of devices"
        :class="{ 'DeviceOption--current': selected.idx === idx }"
        :key="idx"
        @click="selectDevice(idx)"
      >
        {{ device.path }}
      </div>
      <div class="DeviceOption" @click="getDeviceList">Refresh Device List</div>
    </article>
    <div
      v-if="connected"
      class="Connected"
      title="Connected. Click to Disconnect."
      @click="disconnect"
    >
      <svg viewBox="0 0 100 100">
        <path
          d="M41,70.2c-0.8,0-1.5-0.3-2.2-0.8l-10.2-8.1c-1.5-1.2-1.8-3.4-0.5-4.9c1.2-1.5,3.4-1.8,4.9-0.5l7.5,6l25.9-30.8
		c1.2-1.5,3.5-1.7,4.9-0.4c1.5,1.2,1.7,3.5,0.4,4.9L43.7,68.9C43,69.8,42,70.2,41,70.2z"
        />
        <path
          d="M50,97.4C23.8,97.4,2.6,76.2,2.6,50C2.6,23.8,23.8,2.6,50,2.6c26.2,0,47.4,21.3,47.4,47.4C97.4,76.2,76.2,97.4,50,97.4z
		 M50,8.6C27.1,8.6,8.6,27.1,8.6,50c0,22.9,18.6,41.4,41.4,41.4c22.9,0,41.4-18.6,41.4-41.4C91.4,27.1,72.9,8.6,50,8.6z"
        />
      </svg>
    </div>
    <div v-else-if="devices.length > 0" class="Connect" title="Connect" @click="connect">
      <svg viewBox="0 0 100 100">
        <path
          d="M93.6,50.9c0-0.1,0.1-0.2,0.1-0.2c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0-0.1,0.1-0.3,0.1-0.5c0,0,0-0.1,0-0.1
	c0-0.2,0-0.4,0-0.6c0,0,0-0.1,0-0.1c0-0.2,0-0.3-0.1-0.5c0-0.1,0-0.1,0-0.2c0-0.2-0.1-0.3-0.2-0.4c0,0,0-0.1-0.1-0.1
	c-0.1-0.2-0.2-0.4-0.3-0.5c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.1-0.2-0.2-0.2l-24.5-26c-1.3-1.4-3.5-1.5-4.9-0.2
	c-1.4,1.3-1.5,3.5-0.2,4.9l18.9,20.1H9.5c-1.9,0-3.5,1.6-3.5,3.5c0,1.9,1.6,3.5,3.5,3.5h73.2L63.4,74.4c-1.3,1.4-1.2,3.7,0.3,4.9
	c0.7,0.6,1.5,0.9,2.3,0.9c1,0,1.9-0.4,2.6-1.2l24.5-27.4c0,0,0,0,0,0c0.1-0.2,0.3-0.3,0.4-0.5C93.5,51.1,93.6,51,93.6,50.9z"
        />
      </svg>
    </div>
    <div v-else class="Refresh" @click="getDeviceList" title="Refresh">
      <svg viewBox="0 0 100 100">
        <path
          d="M98.8,47.2l-8.1-14.1c-0.3-0.5-1.1-0.5-1.4,0l-8.1,14.1c-0.3,0.5,0.1,1.2,0.7,1.2h5.6c0,0.5,0.1,1,0.1,1.6
		c0,20.7-16.8,37.5-37.5,37.5c-11.5,0-21.8-5.2-28.7-13.4l-2.5,4.7c7.8,8.4,18.9,13.7,31.2,13.7c23.4,0,42.5-19.1,42.5-42.5
		c0-0.5,0-1,0-1.6h5.7C98.8,48.4,99.1,47.8,98.8,47.2z"
        />
        <path
          d="M18.8,52.8c0.3-0.5-0.1-1.2-0.7-1.2h-5.6c0-0.5-0.1-1-0.1-1.6c0-20.7,16.8-37.5,37.5-37.5c11.5,0,21.8,5.2,28.7,13.4
		l2.5-4.7C73.4,12.8,62.3,7.5,50,7.5C26.6,7.5,7.5,26.6,7.5,50c0,0.5,0,1,0,1.6H1.9c-0.6,0-1,0.7-0.7,1.2l8.1,14.1
		c0.3,0.5,1.1,0.5,1.4,0l0.2-0.3c0,0,0,0,0,0l3.3-5.7c0,0,0,0,0,0L18.8,52.8z"
        />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from "vue-property-decorator";
import { PortInfo } from "@/scripts/serial";
@Component
export default class Devices extends Vue {
  @Prop({ default: [] }) devices: Array<PortInfo>;
  @Prop({ default: false }) showDeviceList: boolean;
  @Prop({ default: null }) error: string | null;
  @Prop({ default: false }) connected: boolean;
  pending: boolean = false;
  selected: PortInfo = {
    index: 0,
    path: "Select Device"
  };

  selectDevice(index: number) {
    this.selected = Object.assign(this.selected, this.devices[index], { index: index });
    this.$emit("showDeviceSelectionWindow", false);
  }
  @Emit()
  connect() {
    this.pending = true;
    return this.selected;
  }
  @Emit()
  disconnect() {
    this.pending = true;
    return this.selected;
  }
  @Emit("getDevices")
  getDeviceList() {
    this.pending = true;
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.DevicesContainer {
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  align-items: center;
}
.Error {
  width: 100%;
  color: $alarm-color;
  font-size: 12px;
  margin-bottom: 5px;
}
.CurrentDevice {
  flex: 1;
  margin-right: 8px;
  font-size: 1em;
  padding: 0.5em 13px;
  color: lighten($main-color, 40);
  background: darken($main-color, 3);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;

  span {
    flex: 1;
    text-align: left;
  }
  i {
    width: 0;
    height: 0;
    background: transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid lighten($main-color, 45);
  }
}
.Devices {
  position: absolute;
  width: 100%;
  height: auto;
  max-height: 150px;
  top: 3em;
  margin-top: -3px;
  padding: 5px;
  background: darken($main-color, 2);
  border: 1px solid lighten($main-color, 8);
  box-shadow: 0px 3px 34px darken($main-color, 5);
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;

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

  .DeviceOption {
    padding: 5px 13px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .DeviceOption--current {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: white;
  }
}
.Connect,
.Connected,
.Refresh {
  width: 30px;
  cursor: pointer;
  padding: 2px;
  opacity: 0.8;

  path {
    fill: white;
  }
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(0.98);
  }
}
.Connected {
  path {
    fill: $success-color;
  }
}
</style>
