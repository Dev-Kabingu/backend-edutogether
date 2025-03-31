const socketIO = require("socket.io");

let io;

const initializeSocket = (server) => {
  console.log("Initializing WebSocket..."); 

  io = socketIO(server, {
    cors: { origin: "*" }
  });

  console.log(" WebSocket Initialized"); 

  io.on("connection", (socket) => {
    console.log(`🔌 User Connected: ${socket.id}`); 

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`); 
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};


const sendMeetingNotification = (data) => {
  try {
    console.log("Sending meeting notification...");
    const ioInstance = getIO();  
    ioInstance.emit("newMeeting", data);  
    console.log("Meeting notification sent successfully!"); 
  } catch (error) {
    console.error("Error sending meeting notification:", error.message);  
  }
};

module.exports = { initializeSocket, getIO, sendMeetingNotification };
