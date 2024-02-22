import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Button, Input, Textarea, Text, IconButton, useToast, Flex, Spacer } from "@chakra-ui/react";
import { FaSave, FaTrash, FaPlus, FaBook, FaUserMinus } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notebooks, setNotebooks] = useState({});
  const [currentNotebook, setCurrentNotebook] = useState("");
  const [notebookContent, setNotebookContent] = useState("");
  const toast = useToast();

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
    toast({
      title: "Notebook saved.",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleNewNotebook = () => {
    const newId = `notebook-${Object.keys(notebooks).length + 1}`;
    setNotebooks({ ...notebooks, [newId]: "" });
    setCurrentNotebook(newId);
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
              <Button onClick={() => handleNotebookSelect(id)} leftIcon={<FaBook />} colorScheme="teal" variant="outline">
                {id}
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
          <Box mt={4}>
            <Text mb={2}>Editing {currentNotebook}</Text>
            <Textarea value={notebookContent} onChange={handleContentChange} placeholder="Start typing..." size="sm" />
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Index;
