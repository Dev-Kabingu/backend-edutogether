// const socketIo = require("socket.io");
// const Message = require("./models/Message"); // Import the Message model

// function initializeSocket(server) {
//     const io = socketIo(server, { cors: { origin: "http://localhost:5173" } });

//     io.on("connection", (socket) => {
//         console.log("User connected:", socket.id);

//         // ✅ **Fetch Previous Messages on Connect**
//         socket.on("fetchMessages", async () => {
//             try {
//                 const messages = await Message.find().sort({ createdAt: 1 });
//                 socket.emit("previousMessages", messages);
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         });

//         // ✅ **Handle Sending Messages**
//         socket.on("sendMessage", async (msg) => {
//             try {
//                 const newMessage = new Message({ username: msg.username, text: msg.text });
//                 await newMessage.save();
//                 io.emit("receiveMessage", newMessage); // Send to all clients
//             } catch (error) {
//                 console.error("Error saving message:", error);
//             }
//         });

//         // ✅ **Handle User Disconnection**
//         socket.on("disconnect", () => {
//             console.log("User disconnected:", socket.id);
//         });
//     });
// }

// module.exports = { initializeSocket };
// const socketIo = require("socket.io");
// const Message = require("./models/Message");

// // Create an export object first to avoid circular dependency
// const socketExports = {};

// function initializeSocket(server) {
//     const io = socketIo(server, { cors: { origin: "http://localhost:5173" } });
    
//     // Save `io` inside socketExports to prevent circular dependency
//     socketExports.io = io;

//     io.on("connection", (socket) => {
//         console.log("User connected:", socket.id);

//         // ✅ Fetch previous messages on connect
//         socket.on("fetchMessages", async () => {
//             try {
//                 const messages = await Message.find().sort({ createdAt: 1 });
//                 socket.emit("previousMessages", messages);
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         });

//         // ✅ Handle sending messages
//         socket.on("sendMessage", async (msg) => {
//             try {
//                 const newMessage = new Message({ username: msg.username, text: msg.text });
//                 await newMessage.save();
//                 io.emit("receiveMessage", newMessage); // Send to all clients
//             } catch (error) {
//                 console.error("Error saving message:", error);
//             }
//         });

//         // ✅ Handle user disconnection
//         socket.on("disconnect", () => {
//             console.log("User disconnected:", socket.id);
//         });
//     });
// }

// // Export socket initialization and reference to `io`
// socketExports.initializeSocket = initializeSocket;
// module.exports = socketExports;
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
                io.emit("receiveMessage", newMessage); // Send to all clients
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
