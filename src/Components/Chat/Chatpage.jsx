import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';

const Chatpage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box p={5} border="1px" borderColor="gray.200" borderRadius="lg" maxW="500px" mx="auto">
      <VStack spacing={4} mb={4} overflowY="auto" maxHeight="300px">
        {messages.map((message, index) => (
          <Box key={index} bg="blue.100" p={3} borderRadius="lg" alignSelf="flex-start">
            <Text>{message}</Text>
          </Box>
        ))}
      </VStack>
      <HStack mt={4}>
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button colorScheme="blue" onClick={handleSendMessage}>Send</Button>
      </HStack>
    </Box>
  );
};

export default Chatpage;
