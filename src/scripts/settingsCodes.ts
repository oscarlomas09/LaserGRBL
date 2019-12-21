import { InvertMask, BooleanMask } from "@/scripts/settings.model";
export class SettingCode {
  setting: string = "";
  value: string = "";
  constructor(setting: string, value: string) {
    this.setting = setting;
    this.value = value;
  }
  settingDescription(): string {
    let description: string = "";
    switch (this.setting) {
      case "$0":
        description = "Step Pulse";
        break;
      case "$1":
        description = "Step Idle Delay";
        break;
      case "$2":
        description = "Step Port Invert";
        break;
      case "$3":
        description = "Direction Port Invert";
        break;
      case "$4":
        description = "Step Enable Inverted";
        break;
      case "$5":
        description = "Limit Pins Inverted";
        break;
      case "$6":
        description = "Probe Pin Inverted";
        break;
      case "$10":
        description = "Status Report";
        break;
      case "$11":
        description = "Junction Deviation";
        break;
      case "$12":
        description = "Arc Tolerance";
        break;
      case "$13":
        description = "Report in Inches";
        break;
      case "$20":
        description = "Soft Limits";
        break;
      case "$21":
        description = "Hard Limits";
        break;
      case "$22":
        description = "Homing Cycle";
        break;
      case "$23":
        description = "Homing Direction Invert";
        break;
      case "$24":
        description = "Homing Feed";
        break;
      case "$25":
        description = "Homing Seek";
        break;
      case "$26":
        description = "Homing Debounce";
        break;
      case "$27":
        description = "Homing Pull-Off";
        break;
      case "$30":
        description = "Max Spindle Speed";
        break;
      case "$31":
        description = "Min Spindle Speed";
        break;
      case "$32":
        description = "Laser Mode";
        break;
      case "$100":
        description = "X Steps";
        break;
      case "$101":
        description = "Y Steps";
        break;
      case "$102":
        description = "Z Steps";
        break;
      case "$110":
        description = "X Max Rate";
        break;
      case "$111":
        description = "Y Max Rate";
        break;
      case "$112":
        description = "Z Max Rate";
        break;
      case "$120":
        description = "X Acceleration";
        break;
      case "$121":
        description = "Y Acceleration";
        break;
      case "$122":
        description = "Z Acceleration";
        break;
      case "$130":
        description = "X Max Travel";
        break;
      case "$131":
        description = "Y Max Travel";
        break;
      case "$132":
        description = "Z Max Travel";
        break;
      default:
        description = "Unknown Setting";
        break;
    }
    return description;
  }
  settingValue(): { value: number | boolean; units: string } {
    let value: number | boolean;
    let units: string = "mm";
    switch (this.setting) {
      case "$0":
        value = parseInt(this.value);
        units = "μs";
        break;
      case "$1":
        value = parseInt(this.value);
        units = "ms";
        break;
      case "$2":
        value = parseInt(this.value);
        units = "";
        break;
      case "$3":
        value = parseInt(this.value);
        units = "";
        break;
      case "$4":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$5":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$6":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$10":
        value = parseInt(this.value);
        units = "";
        break;
      case "$11":
        value = parseFloat(this.value);
        units = "mm";
        break;
      case "$12":
        value = parseFloat(this.value);
        units = "mm";
        break;
      case "$13":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$20":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$21":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$22":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$23":
        value = parseInt(this.value);
        units = "";
        break;
      case "$24":
        value = parseFloat(this.value);
        units = "mm/min";
        break;
      case "$25":
        value = parseFloat(this.value);
        units = "mm/min";
        break;
      case "$26":
        value = parseInt(this.value);
        units = "ms";
        break;
      case "$27":
        value = parseFloat(this.value);
        units = "mm";
        break;
      case "$30":
        value = parseInt(this.value);
        units = "RPM";
        break;
      case "$31":
        value = parseInt(this.value);
        units = "RPM";
        break;
      case "$32":
        value = parseInt(this.value) === 0 ? false : true;
        units = "";
        break;
      case "$100":
        value = parseFloat(this.value);
        units = "steps/mm";
        break;
      case "$101":
        value = parseFloat(this.value);
        units = "steps/mm";
        break;
      case "$102":
        value = parseFloat(this.value);
        units = "steps/mm";
        break;
      case "$110":
        value = parseFloat(this.value);
        units = "mm/min";
        break;
      case "$111":
        value = parseFloat(this.value);
        units = "mm/min";
        break;
      case "$112":
        value = parseFloat(this.value);
        units = "mm/min";
        break;
      case "$120":
        value = parseFloat(this.value);
        units = "mm/sec2";
        break;
      case "$121":
        value = parseFloat(this.value);
        units = "mm/sec2";
        break;
      case "$122":
        value = parseFloat(this.value);
        units = "mm/sec2";
        break;
      case "$130":
        value = parseFloat(this.value);
        units = "mm";
        break;
      case "$131":
        value = parseFloat(this.value);
        units = "mm";
        break;
      case "$132":
        value = parseFloat(this.value);
        units = "mm";
        break;
      default:
        value = parseInt(this.value);
        units = "";
        break;
    }
    return {
      value: value,
      units: units
    };
  }
}
