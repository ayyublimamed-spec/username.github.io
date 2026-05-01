let posts = JSON.parse(localStorage.getItem("posts")) || [];
let chat = JSON.parse(localStorage.getItem("chat")) || [];

let lastMessageTime = 0;
let lastPostTime = 0;

/* Безопасный текст */
function safeText(t){
return t
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;");
}

/* Вход */
function login(){
let n = document.getElementById("name").value.trim();

if(n.length < 2){
alert("Введите имя");
return;
}

if(n.length > 20){
alert("Имя слишком длинное");
return;
}

n = safeText(n);

localStorage.setItem("user", n);
location.reload();
}

/* Пост */
function addPost(){

let now = Date.now();

if(now - lastPostTime < 10000){
alert("Подождите 10 секунд");
return;
}

lastPostTime = now;

let t = document.getElementById("postText").value.trim();

if(t.length < 3){
alert("Слишком короткий пост");
return;
}

if(t.length > 200){
alert("Слишком длинный пост");
return;
}

t = safeText(t);

posts.unshift(t);
localStorage.setItem("posts", JSON.stringify(posts));

document.getElementById("postText").value = "";

showPosts();
}

/* Показать посты */
function showPosts(){
let box = document.getElementById("posts");
if(!box) return;

box.innerHTML = "";

posts.forEach(p=>{
box.innerHTML += `
<div class="post">
${p}
<div class="small">❤️ 0 лайков</div>
</div>
`;
});
}

/* Чат */
function sendMsg(){

let now = Date.now();

if(now - lastMessageTime < 3000){
alert("Подождите 3 секунды");
return;
}

lastMessageTime = now;

let t = document.getElementById("chatInput").value.trim();

if(t.length < 1){
alert("Пустое сообщение");
return;
}

if(t.length > 100){
alert("Слишком длинное сообщение");
return;
}

t = safeText(t);

chat.push(t);
localStorage.setItem("chat", JSON.stringify(chat));

document.getElementById("chatInput").value = "";

showChat();
}

/* Показать чат */
function showChat(){
let box = document.getElementById("chat");
if(!box) return;

box.innerHTML = "";

chat.forEach(m=>{
box.innerHTML += `
<div class="chatmsg">${m}</div>
`;
});
}

/* Подписка */
function sub(){
let s = parseInt(localStorage.getItem("subs")) || 0;
s++;

localStorage.setItem("subs", s);

document.getElementById("subs").innerText = s;
}

/* Тёмная тема */
function theme(){
document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
}else{
localStorage.setItem("theme","light");
}
}

/* Загрузка */
window.onload = function(){

document.getElementById("user").innerText =
localStorage.getItem("user") || "Гость";

document.getElementById("subs").innerText =
localStorage.getItem("subs") || 0;

document.getElementById("online").innerText =
Math.floor(Math.random()*25)+5 + " пользователей";

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark");
}

showPosts();
showChat();
};

/* Защита */
document.addEventListener("keydown", function(e){

if(e.key === "F12") e.preventDefault();

if(e.ctrlKey && e.key.toLowerCase() === "u")
e.preventDefault();

if(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")
e.preventDefault();

});

document.addEventListener("contextmenu", function(e){
e.preventDefault();
});
