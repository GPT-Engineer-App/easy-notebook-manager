import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Button, Input, Textarea, Text, IconButton, useToast, Flex, Spacer } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaBook, FaUserMinus, FaSpinner, FaCheck } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notebooks, setNotebooks] = useState({});
  const [currentNotebook, setCurrentNotebook] = useState("");
  const [notebookContent, setNotebookContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleLogin = () => {
    // For now, simply set logged in status to true
    setIsLoggedIn(true);
  };

  const handleNotebookSelect = (id) => {
    setCurrentNotebook(id);
    setNotebookContent(notebooks[id]);
  };

  const handleContentChange = (e) => {
    setNotebookContent(e.target.value);
    // Autosaving would be implemented here
    // For the sake of this example, we mock the save functionality
    setNotebooks({ ...notebooks, [currentNotebook]: e.target.value });
    setIsSaving(true);
    // Simulate a save delay
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const [editingName, setEditingName] = useState("");

  const handleNewNotebook = () => {
    const newId = editingName.trim() || `notebook-${Object.keys(notebooks).length + 1}`;
    if (newId) {
      setNotebooks({ ...notebooks, [newId]: "" });
      setCurrentNotebook(newId);
      setEditingName("");
    }
  };

  const handleRenameNotebook = (id) => {
    const updatedNotebooks = { ...notebooks };
    const newName = editingName.trim();
    if (newName && newName !== id) {
      updatedNotebooks[newName] = updatedNotebooks[id];
      delete updatedNotebooks[id];
      setNotebooks(updatedNotebooks);
      setCurrentNotebook(newName);
    }
    setEditingName("");
  };

  const handleDeleteNotebook = (id) => {
    const updatedNotebooks = { ...notebooks };
    delete updatedNotebooks[id];
    setNotebooks(updatedNotebooks);
    setCurrentNotebook("");
    if (id === currentNotebook) {
      setNotebookContent("");
    }
  };

  const handleDeleteAccount = () => {
    // Reset everything
    setIsLoggedIn(false);
    setNotebooks({});
    setCurrentNotebook("");
    setNotebookContent("");
  };

  if (!isLoggedIn) {
    return (
      <ChakraProvider>
        <VStack spacing={4} align="stretch">
          <Heading>Login to your account</Heading>
          <Input placeholder="Username" size="md" />
          <Input placeholder="Password" size="md" type="password" />
          <Button colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Box m={4}>
        <Flex mb={4}>
          <Heading>My Notebooks</Heading>
          <Spacer />
          <IconButton icon={<FaUserMinus />} onClick={handleDeleteAccount} variant="outline" colorScheme="red" aria-label="Delete Account" />
        </Flex>
        <VStack align="stretch" spacing={4}>
          {Object.keys(notebooks).map((id) => (
            <Flex key={id}>
              <Input value={id} onChange={(e) => setEditingName(e.target.value)} size="md" />
              <Button onClick={() => handleRenameNotebook(id)} colorScheme="blue" variant="outline">
                Rename
              </Button>
              <Spacer />
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteNotebook(id)} colorScheme="red" aria-label="Delete Notebook" />
            </Flex>
          ))}
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleNewNotebook}>
            New Notebook
          </Button>
        </VStack>
        {currentNotebook && (
          <Box mt={4} position="relative">
            <Text mb={2}>Editing {currentNotebook}</Text>
            <Textarea value={notebookContent} onChange={handleContentChange} placeholder="Start typing..." size="sm" />
            <Flex position="absolute" top="2" right="2" align="center">
              {isSaving ? <FaSpinner size="sm" label="Saving..." spin /> : <IconButton icon={<FaCheck />} variant="ghost" isRound={true} label="Saved" aria-label="Saved" />}
            </Flex>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Index;
