// // 📌 Get elements from the page
// const micBtn = document.getElementById("micBtn");
// const sendBtn = document.getElementById("sendBtn");
// const inputBox = document.getElementById("searchInput");
// const messageArea = document.getElementById("searchMessages");
// const historyBox = document.getElementById("historyDrawerContent");
// const drawer = document.getElementById("historyDrawer");
// const overlay = document.getElementById("overlay");
// const menuBtn = document.getElementById("historyToggle");

// // 🗝️ API Key (keep it safe)
// let API_KEY = "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";
// const STORAGE_NAME = "chatHistoryList";

// let allChats = {};
// let currentChatId = null;

// // 🗣️ Voice Input
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// if (SpeechRecognition) {
//   const recognition = new SpeechRecognition();
//   recognition.lang = "en-US";
//   micBtn.addEventListener("click", () => recognition.start());
//   recognition.onresult = (event) => {
//     inputBox.value = event.results[0][0].transcript;
//   };
// } else {
//   micBtn.disabled = true;
//   alert("Voice input not supported on this browser.");
// }

// // 💬 Add message to screen
// function addMessage(text, sender, returnDiv = false) {
//   const row = document.createElement("div");
//   row.className = `flex ${sender === "user" ? "justify-end" : "justify-start"}`;

//   const bubble = document.createElement("div");
//   bubble.textContent = text;
//   bubble.className = `
//     block w-fit max-w-[90%] px-4 py-2 rounded-xl break-words whitespace-pre-line
//     ${sender === "user" ? "bg-white text-black" : "bg-gray-800"}
//   `.trim();

//   row.appendChild(bubble);
//   messageArea.appendChild(row);
//   messageArea.scrollTop = messageArea.scrollHeight;

//   return returnDiv ? bubble : null;
// }

// // 💾 Save chat to localStorage
// function saveMessage(sender, message) {
//   if (!currentChatId) {
//     currentChatId = `chat_${Date.now()}`;
//     allChats[currentChatId] = [];
//   }
//   allChats[currentChatId].push({ role: sender, content: message });
//   localStorage.setItem(STORAGE_NAME, JSON.stringify(allChats));
// }

// // 🧠 Fetch AI reply
// async function talkToAI(userText) {
//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "meta-llama/llama-3-8b-instruct",
//         messages: [
//           { role: "system", content: "Give step-by-step answers. One step per line." },
//           { role: "user", content: userText }
//         ],
//         max_tokens: 300
//       })
//     });

//     const data = await res.json();
//     if (!res.ok) return `❌ Error: ${data.error?.message || "Unknown problem"}`;
//     return data.choices?.[0]?.message?.content?.trim() || "❌ No response from AI";
//   } catch (err) {
//     return "⚠️ Network error or timeout.";
//   }
// }

// // ✅ On send
// sendBtn.addEventListener("click", async () => {
//   const userText = inputBox.value.trim();
//   if (!userText) return;

//   inputBox.value = "";
//   addMessage(userText, "user");
//   saveMessage("user", userText);

//   const loading = addMessage("🤖 Typing...", "bot", true);
//   const reply = await talkToAI(userText);
//   loading.textContent = reply;
//   saveMessage("assistant", reply);

//   updateHistorySidebar();
// });

// // 🗂 Sidebar update
// function updateHistorySidebar() {
//   historyBox.innerHTML = "";
//   for (const chatId in allChats) {
//     const firstMsg = allChats[chatId].find(m => m.role === "user")?.content || "New Chat";
//     const button = document.createElement("button");
//     button.className = "block w-full text-left py-2 px-3 hover:bg-gray-800 rounded";
//     button.textContent = firstMsg.slice(0, 30);
//     button.addEventListener("click", () => {
//       currentChatId = chatId;
//       showChat(chatId);
//     });
//     historyBox.appendChild(button);
//   }
// }

// // 🖼 Load chat
// function showChat(chatId) {
//   messageArea.innerHTML = "";
//   allChats[chatId].forEach(msg => addMessage(msg.content, msg.role));
// }

// // 📱 Sidebar toggle
// menuBtn.addEventListener("click", () => {
//   drawer.classList.toggle("-translate-x-full");
//   overlay.classList.toggle("hidden");
// });
// overlay.addEventListener("click", () => {
//   drawer.classList.add("-translate-x-full");
//   overlay.classList.add("hidden");
// });

// // 🚀 Load on start
// function loadSavedChats() {
//   const saved = localStorage.getItem(STORAGE_NAME);
//   if (saved) {
//     allChats = JSON.parse(saved);
//     const chatKeys = Object.keys(allChats);
//     if (chatKeys.length > 0) {
//       currentChatId = chatKeys[chatKeys.length - 1];
//       showChat(currentChatId);
//     }
//   }
//   updateHistorySidebar();
// }
// loadSavedChats();




// 📌 Get elements from the page
const micBtn = document.getElementById("micBtn");
const sendBtn = document.getElementById("sendBtn");
const inputBox = document.getElementById("searchInput");
const messageArea = document.getElementById("searchMessages");
const historyBox = document.getElementById("historyDrawerContent");
const drawer = document.getElementById("historyDrawer");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("historyToggle");

// 🔐 API Key
const API_KEY = "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"; // Replace with your real key
const STORAGE_NAME = "chatHistoryList";

let allChats = {};
let currentChatId = null;

// 🎤 Voice input
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  micBtn.addEventListener("click", () => recognition.start());
  recognition.onresult = event => {
    inputBox.value = event.results[0][0].transcript;
  };
} else {
  micBtn.disabled = true;
  alert("Voice input not supported.");
}

// 💬 Display message (with Markdown support)
function addMessage(text, sender, returnDiv = false) {
  const row = document.createElement("div");
  row.className = `flex ${sender === "user" ? "justify-end" : "justify-start"}`;

  const bubble = document.createElement("div");
  bubble.innerHTML = marked.parse(text); // ✅ Render Markdown to HTML
  bubble.className = `
    block w-fit max-w-[90%] px-4 py-2 rounded-xl break-words 
    ${sender === "user" ? "bg-white text-black" : "bg-gray-900 text-white"}
  `.trim();

  row.appendChild(bubble);
  messageArea.appendChild(row);
  messageArea.scrollTop = messageArea.scrollHeight;
  return returnDiv ? bubble : null;
}

// 💾 Save message to localStorage
function saveMessage(sender, message) {
  if (!currentChatId) {
    currentChatId = `chat_${Date.now()}`;
    allChats[currentChatId] = [];
  }
  allChats[currentChatId].push({ role: sender, content: message });
  localStorage.setItem(STORAGE_NAME, JSON.stringify(allChats));
}

// 🤖 Talk to AI (using DeepSeek or any other working model)
async function talkToAI(userText) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free", // ✅ Works well and free
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userText }
        ],
        max_tokens: 500
      })
    });

    const data = await res.json();
    if (!res.ok) return `❌ Error: ${data.error?.message || "Unknown problem"}`;
    return data.choices?.[0]?.message?.content?.trim() || "❌ No response from AI";
  } catch (err) {
    return "⚠️ Network error or timeout.";
  }
}

// ✅ Handle send button
sendBtn.addEventListener("click", async () => {
  const userText = inputBox.value.trim();
  if (!userText) return;
  inputBox.value = "";
  addMessage(userText, "user");
  saveMessage("user", userText);
  const loading = addMessage("🤖 Typing...", "bot", true);
  const reply = await talkToAI(userText);
  loading.innerHTML = marked.parse(reply); // ✅ Markdown for bot reply
  saveMessage("assistant", reply);
  updateHistorySidebar();
});

// 📁 Update sidebar history
function updateHistorySidebar() {
  historyBox.innerHTML = "";
  for (const chatId in allChats) {
    const firstMsg = allChats[chatId].find(m => m.role === "user")?.content || "New Chat";
    const btn = document.createElement("button");
    btn.className = "block w-full text-left py-2 px-3 hover:bg-gray-800 rounded text-white";
    btn.textContent = firstMsg.slice(0, 30);
    btn.addEventListener("click", () => {
      currentChatId = chatId;
      showChat(chatId);
    });
    historyBox.appendChild(btn);
  }
}

// 🖼 Show selected chat
function showChat(chatId) {
  messageArea.innerHTML = "";
  allChats[chatId].forEach(msg => addMessage(msg.content, msg.role));
}

// 📱 Sidebar toggle
menuBtn.addEventListener("click", () => {
  drawer.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
});
overlay.addEventListener("click", () => {
  drawer.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

// 🚀 Load saved chats
function loadSavedChats() {
  const saved = localStorage.getItem(STORAGE_NAME);
  if (saved) {
    allChats = JSON.parse(saved);
    const keys = Object.keys(allChats);
    if (keys.length) {
      currentChatId = keys[keys.length - 1];
      showChat(currentChatId);
    }
  }
  updateHistorySidebar();
}
loadSavedChats();
