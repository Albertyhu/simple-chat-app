var OnlineList = [];
var socket = io();

var chatform = document.getElementById("chatform");
var LoginFrom = document.getElementById("login-form");
var LoginErrorMessage = document.getElementById("login-error");
var MobileMenu = document.getElementById("MobileMenu");
var LogoutLink = document.getElementById("logout-link");
var MenuHeader = document.getElementById("MenuHeader");
const UserList = document.getElementById("online-list");

const UsernameInput = document.getElementById("username-input");

var socket = io();
var chatform = document.getElementById("chatform");
var input = document.getElementById("input");
var messages = document.getElementById("messages");
var serverMessage = document.getElementById("server_message");

var ExistingChats = document.getElementById('existing-chats'); 
var ExistingChatListWrapper = document.getElementById("existing-chat-list-wrapper"); 

var localUsername = localStorage.getItem("username");
var UserID = localStorage.getItem("UserID")
let username =
  localUsername != null || localUsername != "" ? localUsername : input.value;
let userSocketId = null;

const alpha = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

var ToggleExistingRoomBtn = document.getElementById("ToggleExistingRoom"); 
var MobileExistingRoomList = document.getElementById("existing-rooms-list"); 


