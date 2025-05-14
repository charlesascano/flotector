import React, { useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import { HiUpload, HiCamera } from "react-icons/hi";

const FileUpload = ({ onFileSelect, camera = false }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <Box textAlign="center">
      <input
        type="file"
        accept="image/*"
        capture={camera ? "environment" : undefined}
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleChange}
      />
      <Button
        leftIcon={camera ? <HiCamera /> : <HiUpload />}
        onClick={handleClick}
        colorScheme={camera ? "blue" : "green"}
        variant="outline"
        size="sm"
      >
        {camera ? "Open Camera" : "Upload File"}
      </Button>
    </Box>
  );
};

export default FileUpload;
