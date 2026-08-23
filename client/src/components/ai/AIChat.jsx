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

const initialMessage = {
  sender: "ai",
  text: "👋 Hello! I'm HostelHub AI. How can I help you today?",
};

function AIChat() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("aiChat");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [initialMessage];
      }
    }

    return [initialMessage];
  });

  const bottomRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("aiChat", JSON.stringify(messages));
  }, [messages]);

  // Send quick button message
  const sendQuickMessage = async (text) => {
    if (!text || loading) return;

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
      console.error("AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to contact AI. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send typed message
  const sendMessage = async () => {
    const currentMessage = message.trim();

    if (!currentMessage || loading) return;

    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

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
      console.error("AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to contact AI. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear conversation
  const clearChat = () => {
    setMessages([initialMessage]);
    localStorage.removeItem("aiChat");
  };

  return (
    <>
      {/* ================= FLOATING AI BUTTON ================= */}
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
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        🤖
      </button>

      {/* ================= CHAT WINDOW ================= */}
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
          {/* ================= HEADER ================= */}
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
                onClick={clearChat}
                title="Clear chat"
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

          {/* ================= QUICK OPTIONS ================= */}
          {messages.length === 1 && (
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
                onClick={() =>
                  sendQuickMessage("What is my room number?")
                }
                style={quickBtn}
              >
                🏠 My Room
              </button>

              <button
                onClick={() =>
                  sendQuickMessage("Do I have pending fees?")
                }
                style={quickBtn}
              >
                💰 Fees
              </button>

              <button
                onClick={() =>
                  sendQuickMessage("Show latest notices")
                }
                style={quickBtn}
              >
                📢 Notices
              </button>
            </div>
          )}

          {/* ================= MESSAGES ================= */}
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
                    lineHeight: "1.5",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div
                style={{
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                🤖 Typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* ================= INPUT ================= */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ddd",
              background: "#fff",
            }}
          >
            <input
              type="text"
              placeholder="Ask HostelHub AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
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
              disabled={loading || !message.trim()}
              style={{
                marginLeft: "10px",
                padding: "10px 18px",
                border: "none",
                background:
                  loading || !message.trim()
                    ? "#9ca3af"
                    : "#2563eb",
                color: "#fff",
                borderRadius: "8px",
                cursor:
                  loading || !message.trim()
                    ? "not-allowed"
                    : "pointer",
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