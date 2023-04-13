const { app, express, http, io, server } = require('./web')

// Text to number function

/**
 * 
 * @param {String} text 
 * @returns 
 */
const textToNumber = (text) => {
  let number = 0;
  for (let i = 0; i < text.length; i++) {
    number += text.charCodeAt(i);
  }
  return {
    n: number,
    l: text.length
  }
}

const numberToText = (number, textLenth) => {
    let text = "";
    for (let i = 0; i < textLenth; i++) {
      text += String.fromCharCode(number % 26 + 65);
      number = Math.floor(number / 26);
    }
    return text;
}

app.get('/', (req, res) => {
  res.render("pingcord")
});

app.get("/test/:text",(req, res) => {
    let text = req.params.text;
    let number = textToNumber(text);
    res.json({
        m: textToNumber(text),
        o: String.fromCharCode(text)
    });
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});