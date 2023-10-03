import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useMessageState } from "./messageState"; // <-- Import here

export default function App() {
  const { messages, newMessage, setNewMessage, handleSend } = useMessageState(); // <-- Use here
  const flatListRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.type === "user" ? styles.userMessage : styles.botMessage
            }
          >
            <Text style={{ color: item.type === "user" ? "white" : "black" }}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => handleSend(flatListRef)}>
            <Text style={styles.sendButton}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  userMessage: {
    backgroundColor: "#0084ff",
    alignSelf: "flex-end",
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderTopRightRadius: 5,
    maxWidth: "80%",
  },
  botMessage: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderTopLeftRadius: 5,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  sendButton: {
    backgroundColor: "#0084ff",
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 5,
  },
});
