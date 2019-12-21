export class ErrorCode {
  code: number = 0;
  constructor(code: number) {
    this.code = code;
  }
  getCodeDescription(): string {
    let description: string;
    switch (this.code) {
      case 1:
        description = "G-code words consist of a letter and a value. Letter was not found.";
        break;
      case 2:
        description = "Numeric value format is not valid or missing an expected value.";
        break;
      case 3:
        description = "Grbl '$' system command was not recognized or supported.";
        break;
      case 4:
        description = "Negative value received for an expected positive value.";
        break;
      case 5:
        description = "Homing cycle is not enabled via settings.";
        break;
      case 6:
        description = "Minimum step pulse time must be greater than 3usec";
        break;
      case 7:
        description = "EEPROM read failed. Reset and restored to default values.";
        break;
      case 8:
        description =
          "Grbl '$' command cannot be used unless Grbl is IDLE. Ensures smooth operation during a job.";
        break;
      case 9:
        description = "G-code locked out during alarm or jog state";
        break;
      case 10:
        description = "Soft limits cannot be enabled without homing also enabled.";
        break;
      case 11:
        description = "Max characters per line exceeded. Line was not processed and executed.";
        break;
      case 12:
        description =
          "(Compile Option) Grbl '$' setting value exceeds the maximum step rate supported.";
        break;
      case 13:
        description = "Safety door detected as opened and door state initiated.";
        break;
      case 14:
        description =
          "(Grbl-Mega Only) Build info or startup line exceeded EEPROM line length limit.";
        break;
      case 15:
        description = "Jog target exceeds machine travel. Command ignored.";
        break;
      case 16:
        description = "Jog command with no '=' or contains prohibited g-code.";
        break;
      case 17:
        description = "Laser mode requires PWM output.";
        break;
      case 18:
        description = "18";
        break;
      case 19:
        description = "	19";
        break;
      case 20:
        description = "Unsupported or invalid g-code command found in block.";
        break;
      case 21:
        description = "More than one g-code command from same modal group found in block.";
        break;
      case 22:
        description = "Feed rate has not yet been set or is undefined.";
        break;
      case 23:
        description = "G-code command in block requires an integer value.";
        break;
      case 24:
        description =
          "Two G-code commands that both require the use of the XYZ axis words were detected in the block.";
        break;
      case 25:
        description = "A G-code word was repeated in the block.";
        break;
      case 26:
        description =
          "A G-code command implicitly or explicitly requires XYZ axis words in the block, but none were detected.";
        break;
      case 27:
        description = "N line number value is not within the valid range of 1 - 9,999,999.";
        break;
      case 28:
        description =
          "A G-code command was sent, but is missing some required P or L value words in the line.";
        break;
      case 29:
        description =
          "Grbl supports six work coordinate systems G54-G59. G59.1, G59.2, and G59.3 are not supported.";
        break;
      case 30:
        description =
          "	The G53 G-code command requires either a G0 seek or G1 feed motion mode to be active. A different motion was active.";
        break;
      case 31:
        description =
          "There are unused axis words in the block and G80 motion mode cancel is active.";
        break;
      case 32:
        description =
          "A G2 or G3 arc was commanded but there are no XYZ axis words in the selected plane to trace the arc.";
        break;
      case 33:
        description =
          "The motion command has an invalid target. G2, G3, and G38.2 generates this error, if the arc is impossible to generate or if the probe target is the current position.";
        break;
      case 34:
        description =
          "A G2 or G3 arc, traced with the radius definition, had a mathematical error when computing the arc geometry.";
        break;
      case 35:
        description =
          "A G2 or G3 arc, traced with the offset definition, is missing the IJK offset word in the selected plane to trace the arc.";
        break;
      case 36:
        description =
          "There are unused, leftover G-code words that aren't used by any command in the block.";
        break;
      case 37:
        description =
          "The G43.1 dynamic tool length offset command cannot apply an offset to an axis other than its configured axis. The Grbl default axis is the Z-axis.";
        break;
      case 38:
        description = "Tool number greater than max supported value.";
        break;
      default:
        description = "Unknown Error";
        break;
    }
    return description;
  }
}
