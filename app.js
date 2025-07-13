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

const micBtn = document.getElementById("micBtn");
const sendBtn = document.getElementById("sendBtn");
const inputBox = document.getElementById("searchInput");
const messageArea = document.getElementById("searchMessages");
const historyBox = document.getElementById("historyDrawerContent");
const drawer = document.getElementById("historyDrawer");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("historyToggle");

const API_KEY = "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"; // ✅ Replace with your FREE OpenRouter key
const STORAGE_NAME = "chatHistoryList";

let allChats = {};
let currentChatId = null;

// Voice recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  micBtn.addEventListener("click", () => recognition.start());
  recognition.onresult = (event) => {
    inputBox.value = event.results[0][0].transcript;
  };
} else {
  micBtn.disabled = true;
  alert("Voice input not supported.");
}

function addMessage(text, sender, returnDiv = false) {
  const row = document.createElement("div");
  row.className = `flex ${sender === "user" ? "justify-end" : "justify-start"}`;

  const bubble = document.createElement("div");
  bubble.innerHTML = marked.parse(text);
  bubble.className = `
    block w-fit max-w-[90%] px-4 py-2 rounded-xl break-words 
    ${sender === "user" ? "bg-white text-black" : "bg-gray-900 text-white"}
  `.trim();

  row.appendChild(bubble);
  messageArea.appendChild(row);
  messageArea.scrollTop = messageArea.scrollHeight;
  return returnDiv ? bubble : null;
}

function saveMessage(sender, message) {
  if (!currentChatId) {
    currentChatId = `chat_${Date.now()}`;
    allChats[currentChatId] = [];
  }
  allChats[currentChatId].push({ role: sender, content: message });
  localStorage.setItem(STORAGE_NAME, JSON.stringify(allChats));
}

async function talkToAI(userText) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: "Be helpful, friendly, and clear." },
          { role: "user", content: userText },
        ],
        max_tokens: 500,
      }),
    });

    const data = await res.json();
    if (!res.ok) return `❌ Error: ${data.error?.message || "Unknown error"}`;
    return data.choices?.[0]?.message?.content?.trim() || "❌ No response";
  } catch (err) {
    return "⚠️ Network error or server timeout.";
  }
}

sendBtn.addEventListener("click", async () => {
  const userText = inputBox.value.trim();
  if (!userText) return;
  inputBox.value = "";
  addMessage(userText, "user");
  saveMessage("user", userText);
  const loading = addMessage("🤖 Typing...", "bot", true);
  const reply = await talkToAI(userText);
  loading.innerHTML = marked.parse(reply);
  saveMessage("assistant", reply);
  updateHistorySidebar();
});

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

function showChat(chatId) {
  messageArea.innerHTML = "";
  allChats[chatId].forEach(msg => addMessage(msg.content, msg.role));
}

menuBtn.addEventListener("click", () => {
  drawer.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
});
overlay.addEventListener("click", () => {
  drawer.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

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
