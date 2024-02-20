import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text, IconButton, Spinner } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "./styles.css";
import Lottie from "react-lottie";
import { useState } from "react";

const SingleChat = () => {
  const [newMessage, setNewMessage] = useState(""); // For handling the new message input
  const [loading, setLoading] = useState(false); // Simulate loading state
  const [messages, setMessages] = useState([]); // Assuming you have a way to set messages
  const [isTyping, setIsTyping] = useState(false); // Simulate typing indicator

  // Handlers for message input
  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    // You might want to implement real-time typing indication here
  };

  // Placeholder sendMessage function
  const sendMessage = (event) => {
    if (event.key === "Enter") {
      console.log("Message sent: ", newMessage);
      setNewMessage(""); // Reset input field after sending a message
      // Add your logic here to actually send the message
    }
  };

  // Placeholder for Lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // You need to provide your animation data here
    animationData: {}, // Example: require('./path/to/your-animation.json'),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Box d="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
        {loading ? (
          <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
        ) : (
          <div className="messages">
            {/* Here you would render your messages */}
          </div>
        )}

        <FormControl onKeyDown={sendMessage} id="first-name" isRequired mt={3}>
          {isTyping ? (
            <div>
              <Lottie options={defaultOptions} width={70} style={{ marginBottom: 15, marginLeft: 0 }} />
            </div>
          ) : (
            <></>
          )}
          <Input
            variant="filled"
            bg="#E0E0E0"
            placeholder="Enter a message.."
            value={newMessage}
            onChange={typingHandler}
          />
        </FormControl>
      </Box>

      {/* Placeholder for when there's no chat selected or for additional UI elements */}
      <Box d="flex" alignItems="center" justifyContent="center" h="100%">
        <Text fontSize="3xl" pb={3} fontFamily="Work sans">
          Click on a user to start chatting
        </Text>
      </Box>
    </>
  );
};

export default SingleChat;
