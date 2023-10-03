import { useState } from "react";

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
};

export const useMessageState = () => {
  const [messages, setMessages] = useState([
    {
      id: generateUniqueId(),
      type: "user",
      text: "What is the weather like today?",
    },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "The weather is sunny with a high of 75°F.",
      suggestions: ["Tell me more", "How about tomorrow?"],
    },
    { id: generateUniqueId(), type: "user", text: "How about tomorrow?" },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "Tomorrow is expected to be cloudy.",
      suggestions: ["Thanks!", "What should I wear?"],
    },
    { id: generateUniqueId(), type: "user", text: "What should I wear?" },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "I recommend a light jacket and some comfortable shoes.",
      suggestions: ["Great, thanks!", "Any more tips?"],
    },
    { id: generateUniqueId(), type: "user", text: "Any more tips?" },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "Don't forget your umbrella just in case.",
      suggestions: ["Got it!", "How about for the evening?"],
    },
    {
      id: generateUniqueId(),
      type: "user",
      text: "How about for the evening?",
    },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "It might get cooler, so perhaps a sweater would be good.",
      suggestions: ["Great, thanks!", "Any more advice?"],
    },
    { id: generateUniqueId(), type: "user", text: "Any more advice?" },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "That's all the advice I have for now!",
      suggestions: ["Alright, thanks!", "Goodbye"],
    },
    { id: generateUniqueId(), type: "user", text: "Alright, thanks!" },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "You're welcome!",
      suggestions: ["Goodbye", "Ask another question"],
    },
    { id: generateUniqueId(), type: "user", text: "Goodbye" },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "Goodbye! Have a great day!",
      suggestions: [],
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = (flatListRef) => {
    if (newMessage.trim() === "") {
      return;
    }

    const newUserMessageId = generateUniqueId();
    const newBotMessageId = generateUniqueId();

    const userMessage = {
      id: newUserMessageId,
      type: "user",
      text: newMessage,
    };
    const botMessage = {
      id: newBotMessageId,
      type: "bot",
      text: `You said: ${newMessage}`,
      suggestions: [],
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setNewMessage("");

    // Scroll to the end of the FlatList
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSend,
  };
};
