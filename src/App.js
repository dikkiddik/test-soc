import React, { useState, useEffect } from "react";

const socket = new WebSocket(
  "wss://3cg3aoajn0.execute-api.ap-northeast-1.amazonaws.com/Prod"
);
//ここにソケットを追加する

function WebSocketComponent() {
  const [text, setText] = useState("init");
  const [newMessage, setNewMessage] = React.useState("");

  React.useEffect(() => {
    socket.onopen = (event) => {
      // クライアント接続時
      console.log("onopen", event);
    };

    socket.onmessage = (event) => {
      // サーバーからのメッセージ受信時
      setText(event.data);
      console.log("onmessgae", event);
    };

    socket.onclose = (event) => {
      // クライアント切断時
      console.log("onclose", event);
    };

    //   return () => {
    //     socket.close();
    //   };
  });

  const handleSendMessage = () => {
    var obj = { action: "sendmessage", data: newMessage };
    var json = JSON.stringify(obj);
    socket.send(json);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div>
      <p>{text}</p>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
}

export default WebSocketComponent;
