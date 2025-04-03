const socketIo = require("socket.io");
const Message = require("./models/Message");

function initializeSocket(server) {
    const io = socketIo(server, { cors: { origin: "http://localhost:5173" } });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("fetchMessages", async () => {
            try {
                const messages = await Message.find().sort({ createdAt: 1 });
                socket.emit("previousMessages", messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        });

        socket.on("sendMessage", async (msg) => {
            try {
                const newMessage = new Message({ username: msg.username, text: msg.text });
                await newMessage.save();
                io.emit("receiveMessage", newMessage);
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}

module.exports = { initializeSocket };
