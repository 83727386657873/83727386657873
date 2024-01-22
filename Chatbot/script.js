const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const ChatbotToggler = document.querySelector(".Chatbot-toggler");
const ChatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : ` <span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent=message;
    return chatLi;
}
const generateRespone = (incomingChatLi) => {
    const API_URL = " https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOption = {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": userMessage }]
        })
    }
    fetch(API_URL, requestOption).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;

    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Opps! Something went wrong .please try again.";

    }).finally(()=> chatbox.scrollTo(0,chatbox.scrollHeight));
}



const handleChat = () => {
    userMessage = chatInput.value.trim();

    if (!userMessage) return;
    chatInput.value="";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Wait a Moment...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateRespone(incomingChatLi);

    }, 600);
  
}


sendChatBtn.addEventListener("click", handleChat);
ChatbotCloseBtn.addEventListener("click", () =>document.body.classList.remove("show-Chatbot"));
ChatbotToggler.addEventListener("click", () =>document.body.classList.toggle("show-Chatbot"));


