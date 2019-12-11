// To get a default set of Bindings and Parsers
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
SerialPort.list()
  .then(res => console.log(res))
  .catch(err => console.log(err));
/*
const port = new SerialPort("COM9", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));
// Read the port data
port.on("open", () => {
  console.log("serial port open");
  writeAndDrain("$$", err => {
    if (err) {
      console.log(err);
    }
  });
});
parser.on("data", data => {
  console.log("got word from arduino:", data);
});

function writeAndDrain(data, callback) {
  port.write(data);
  port.drain(callback);
}
*/
