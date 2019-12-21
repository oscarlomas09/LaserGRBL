import Vue from "vue";
import Vuex from "vuex";
import { Settings, InvertMask, BooleanMask } from "@/scripts/settings.model";
import { PortInfo } from "@/scripts/serial";

Vue.use(Vuex);

interface RootState {
  currentCommand: string | null;
  responseMessages: Array<string>;
  commandMessages: Array<string>;
  position: {
    x: number;
    y: number;
  };
  printArea: {
    width: number;
    height: number;
  };
  unit: string;
  speed: number;
  width: number;
  height: number;
  settingsOnDefault: boolean;
  settings: Settings;
  connection: PortInfo | null;
  processing: boolean;
}

const state: RootState = {
  currentCommand: null,
  responseMessages: [],
  commandMessages: [],
  position: {
    x: 0,
    y: 0
  },
  printArea: {
    width: 100,
    height: 100
  },
  speed: 50,
  width: 100,
  height: 100,
  unit: "mm",
  connection: null,
  settingsOnDefault: true,
  settings: {
    pulseTime: 10,
    idleDelay: 25,
    portInvertMask: InvertMask["00000000"],
    directionInvertMark: InvertMask["00000000"],
    invertEnablePin: BooleanMask.FALSE,
    invertLimitPin: BooleanMask.FALSE,
    invertProbePin: BooleanMask.FALSE,
    statusReportMask: InvertMask["00000001"],
    deviation: 0.01,
    arcTolerance: 0.002,
    reportInInches: BooleanMask.FALSE,
    enableSoftLimits: BooleanMask.FALSE,
    enableHardLimits: BooleanMask.FALSE,
    enableHomeCycle: BooleanMask.FALSE,
    homingInvertMask: InvertMask["00000000"],
    homingFeedRate: 25.0,
    homingSeekRate: 500.0,
    homingDebounceDelay: 250,
    homingPullOffDistance: 1.0,
    maxSpindleSpeed: 1000,
    minSpindleSpeed: 0,
    laserMode: BooleanMask.TRUE,
    xSteps: 250.0,
    ySteps: 250.0,
    zSteps: 250.0,
    xMaxRate: 500.0,
    yMaxRate: 500.0,
    zMaxRate: 500.0,
    xAcceleration: 10.0,
    yAcceleration: 10.0,
    zAcceleration: 10.0,
    xMaxTravel: 200.0,
    yMaxTravel: 200.0,
    zMaxTravel: 200.0
  },
  processing: false
};

export default new Vuex.Store({
  state: state,
  getters: {
    getCurrentCommand: state => {
      return state.currentCommand;
    },
    getQueuedCommands: state => {
      return state.commandMessages;
    },
    getQueuedResponses: state => {
      return state.responseMessages;
    },
    getWidth: state => {
      return state.width;
    },
    getHeight: state => {
      return state.height;
    },
    getSpeed: state => {
      return state.speed;
    },
    getUnits: state => {
      return state.unit;
    },
    getPosition: state => {
      return state.position;
    },
    getPrintArea: state => {
      return state.position;
    },
    getSettings: state => {
      return state.settings;
    },
    showingDefaultSettings: state => {
      return state.settingsOnDefault;
    },
    getConnection: state => {
      return state.connection;
    },
    isProcessing: state => {
      return state.processing;
    }
  },
  mutations: {
    QUEUE_COMMAND(state, command) {
      state.commandMessages.push(command);
    },
    DEQUEUE_COMMAND(state) {
      state.commandMessages.shift();
    },
    QUEUE_RESPONSE(state, response) {
      state.responseMessages.push(response);
    },
    DEQUEUE_RESPONSE(state) {
      state.responseMessages.shift();
    },
    INCREASE_SPEED(state, amt) {
      state.speed += amt;
    },
    DECREASE_SPEED(state, amt) {
      if (state.speed - amt > 0) {
        state.speed -= amt;
      } else {
        state.speed = 0;
      }
    },
    UPDATE_POSITION(state, location) {
      state.position = Object.assign(state.position, location);
    },
    UPDATE_PRINTAREA(state, area) {
      state.printArea = Object.assign(state.printArea, area);
    },
    UPDATE_SETTINGS(state, settings) {
      state.settings = Object.assign(state.settings, settings);
    },
    DEFAULT_SETTINGS(state, isDefault) {
      state.settingsOnDefault = isDefault;
    },
    CREATE_CONNECTION(state, connection) {
      state.connection = connection;
    },
    DESTROY_CONNECTION(state) {
      state.connection = null;
    },
    PROCESSING(state, isProcessing) {
      state.processing = isProcessing;
    }
  },
  actions: {},
  modules: {}
});
