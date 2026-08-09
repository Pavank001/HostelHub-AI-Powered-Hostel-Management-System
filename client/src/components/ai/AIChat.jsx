import { useState, useRef, useEffect } from "react";
import { askAI } from "../../services/aiService";

const quickBtn = {
  padding: "6px 12px",
  border: "1px solid #2563eb",
  borderRadius: "20px",
  background: "#fff",
  color: "#2563eb",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
};
function AIChat() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
  const saved = localStorage.getItem("aiChat");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      sender: "ai",
      text: "👋 Hello! I'm HostelHub AI. How can I help you today?",
    },
  ];
});

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
      useEffect(() => {
  localStorage.setItem("aiChat", JSON.stringify(messages));
}, [messages]);
    const sendQuickMessage = async (text) => {
  if (!text) return;

  const userMessage = {
    sender: "user",
    text,
  };

  setMessages((prev) => [...prev, userMessage]);

  setLoading(true);

  try {
    const data = await askAI(text);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "❌ Failed to contact AI.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const data = await askAI(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to contact AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "360px",
            height: "520px",
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* Header */}
         {/* Header */}

<div
  style={{
    background: "#2563eb",
    color: "#fff",
    padding: "15px",
    fontWeight: "bold",
    fontSize: "18px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <span>🤖 HostelHub AI</span>

    <button
      onClick={() => {
        const initial = [
          {
            sender: "ai",
            text: "👋 Hello! I'm HostelHub AI. How can I help you today?",
          },
        ];

        setMessages(initial);
        localStorage.removeItem("aiChat");
      }}
      style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      🗑
    </button>
  </div>
</div>
        <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
  }}
>
  
  <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
  }}
>
  <button
    onClick={() => sendQuickMessage("What is my room number?")}
    style={quickBtn}
  >
    🏠 My Room
  </button>

  <button
    onClick={() => sendQuickMessage("Do I have pending fees?")}
    style={quickBtn}
  >
    💰 Fees
  </button>

  <button
    onClick={() => sendQuickMessage("Show latest notices")}
    style={quickBtn}
  >
    📢 Notices
  </button>

  <button
    onClick={() =>
      sendQuickMessage(
        "Write a leave application for 2 days because I have a fever starting tomorrow."
      )
    }
    style={quickBtn}
  >
    📝 Leave
  </button>

  <button
    onClick={() =>
      sendQuickMessage(
        "Write a complaint for broken fan."
      )
    }
    style={quickBtn}
  >
    ⚠ Complaint
  </button>
</div>

  
</div>
          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              background: "#f5f5f5",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    background:
                      msg.sender === "user"
                        ? "#2563eb"
                        : "#e5e7eb",
                    color:
                      msg.sender === "user"
                        ? "#fff"
                        : "#000",
                    padding: "10px 15px",
                    borderRadius: "15px",
                    maxWidth: "80%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ color: "#666" }}>
                🤖 Typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              type="text"
              placeholder="Ask HostelHub AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                marginLeft: "10px",
                padding: "10px 18px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;