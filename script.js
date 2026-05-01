let posts = JSON.parse(localStorage.getItem("posts")) || [];
let chat = JSON.parse(localStorage.getItem("chat")) || [];

/* Вход */
function login(){
let n = document.getElementById("name").value.trim();

if(n.length < 2){
alert("Введите имя");
return;
}

localStorage.setItem("user", n);
location.reload();
}

/* Безопасный текст */
function safeText(t){
return t
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;");
}

/* Добавить пост */
function addPost(){
let t = document.getElementById("postText").value.trim();

if(t.length < 3){
alert("Слишком короткий текст");
return;
}

if(t.length > 200){
alert("Слишком длинный текст");
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

posts.forEach(p => {
box.innerHTML += `
<div class="post">
${p}
<div class="small">❤️ 0 лайков</div>
</div>
`;
});
}

/* Отправить сообщение */
function sendMsg(){
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

chat.forEach(m => {
box.innerHTML += `
<div class="chatmsg">${m}</div>
`;
});
}

/* Очистить посты */
function clearPosts(){
posts = [];
localStorage.setItem("posts", JSON.stringify(posts));
showPosts();
}

/* Очистить чат */
function clearChat(){
chat = [];
localStorage.setItem("chat", JSON.stringify(chat));
showChat();
}

/* Подписки */
function sub(){
let s = parseInt(localStorage.getItem("subs")) || 0;
s++;

localStorage.setItem("subs", s);

let el = document.getElementById("subs");
if(el) el.innerText = s;
}

/* Тёмная тема */
function theme(){
document.body.classList.toggle("dark");
}

/* Загрузка сайта */
window.onload = function(){

let user = localStorage.getItem("user") || "Гость";

let u = document.getElementById("user");
if(u) u.innerText = user;

let s = document.getElementById("subs");
if(s) s.innerText = localStorage.getItem("subs") || 0;

let o = document.getElementById("online");
if(o){
o.innerText =
Math.floor(Math.random() * 25) + 5 + " пользователей";
}

showPosts();
showChat();

};
