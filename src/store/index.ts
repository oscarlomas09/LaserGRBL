import Vue from "vue";
import Vuex from "vuex";

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
  unit: "mm"
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
    }
  },
  actions: {},
  modules: {}
});
