let posts = JSON.parse(localStorage.getItem("posts")) || [];
let chat = JSON.parse(localStorage.getItem("chat")) || [];

function login(){
let n = document.getElementById("name").value || "Гость";
localStorage.setItem("user", n);
document.getElementById("user").innerText = n;
}

function addPost(){
let t = document.getElementById("postText").value;
if(t != ""){
posts.unshift(t);
localStorage.setItem("posts", JSON.stringify(posts));
showPosts();
document.getElementById("postText").value = "";
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
