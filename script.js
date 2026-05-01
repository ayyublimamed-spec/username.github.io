let posts = JSON.parse(localStorage.getItem("posts")) || [];
let chat = JSON.parse(localStorage.getItem("chat")) || [];

function login(){
let n = document.getElementById("name").value || "Гость";
localStorage.setItem("user", n);
document.getElementById("user").innerText = n;
}

function addPost(){
let t = document.getElementById("postText").value.trim();

if(t.length < 3) {
  alert("Слишком короткий текст");
  return;
}

if(t.length > 200) {
  alert("Слишком длинный текст");
  return;
}
}
}

function showPosts(){
let box = document.getElementById("posts");
box.innerHTML = "";

posts.forEach(p => {
box.innerHTML += `
<div class="post">
${p}
<div class="small">❤️ 0 лайков</div>
</div>
`;
});
}

function sendMsg(){
let t = document.getElementById("chatInput").value;
  t = t.trim();

if(t.length < 1){
alert("Пустое сообщение");
return;
}

if(t.length > 100){
alert("Слишком длинное сообщение");
return;
}
if(t != ""){
chat.push(t);
localStorage.setItem("chat", JSON.stringify(chat));
showChat();
document.getElementById("chatInput").value = "";
}
}

function showChat(){
let box = document.getElementById("chat");
box.innerHTML = "";

chat.forEach(m => {
box.innerHTML += `
<div class="chatmsg">${m}</div>
`;
});
}

function clearPosts(){
posts = [];
localStorage.setItem("posts", "[]");
showPosts();
}

function clearChat(){
chat = [];
localStorage.setItem("chat", "[]");
showChat();
}

function sub(){
let s = parseInt(localStorage.getItem("subs")) || 0;
s++;
localStorage.setItem("subs", s);
document.getElementById("subs").innerText = s;
}

function theme(){
document.body.classList.toggle("dark");
}

window.onload = function(){
document.getElementById("user").innerText =
localStorage.getItem("user") || "Гость";

document.getElementById("subs").innerText =
localStorage.getItem("subs") || 0;

document.getElementById("online").innerText =
Math.floor(Math.random() * 25) + 5 + " пользователей";

showPosts();
showChat();
};
document.addEventListener("keydown", function(e) {
  if (e.key === "F12") e.preventDefault();

  if (e.ctrlKey && e.key.toLowerCase() === "u")
    e.preventDefault();

  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")
    e.preventDefault();
});

document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

