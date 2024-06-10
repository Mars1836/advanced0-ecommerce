const socket = io("http://localhost:7000", { autoConnection: false });
socket.onAny((event, ...args) => {
  console.log(event, args);
});
console.log(io);
socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    console.log("enter username");
  }
});

socket.on("private message", ({ content, from }) => {
  for (let i = 0; i < this.users.length; i++) {
    const user = this.users[i];
    if (user.userID === from) {
      user.messages.push({
        content,
        fromSelf: false,
      });
      if (user !== this.selectedUser) {
        user.hasNewMessages = true;
      }
      break;
    }
  }
});

socket.on("users", (users) => {
  users.forEach((user) => {
    user.self = user.userID === socket.id;
  });
  // put the current user first, and then sort by username
  this.users = users.sort((a, b) => {
    if (a.self) return -1;
    if (b.self) return 1;
    if (a.username < b.username) return -1;
    return a.username > b.username ? 1 : 0;
  });
  console.log(this.users);
});
socket.on("user connected", (user) => {
  this.users.push(user);
});
const form = document.getElementById("form");
const input = document.getElementById("input");
function setName(username) {
  socket.auth = { username };
  socket.connect();
  console.log(socket);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(input.value);
  if (input.value) {
    setName(input.value);
    // socket.emit("chat message", input.value);
    input.value = "";
  }
});
