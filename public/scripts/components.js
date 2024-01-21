var OnlineList = []; 
var socket = io();

var chatform = document.getElementById('chatform'); 
var username = localStorage.getItem("username")
var LoginFrom = document.getElementById("login-form")
var MobileMenu = document.getElementById("MobileMenu")
var LogoutLink = document.getElementById("logout-link")
var MenuHeader = document.getElementById('MenuHeader')
const UserList = document.getElementById("online-list"); 