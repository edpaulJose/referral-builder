import { memo, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploadButton = ({
  id,
  label = "Upload File",
  // toBase64 = false,
  onChange,
  maxSize = 1024 * 1024, // 1 MB in bytes
}) => {
  const [error, setError] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > maxSize) {
      setError("File size exceeds 1 MB. Please upload a smaller file.");
      return;
    }
    setError(""); // Clear any previous error
    if (file && onChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        onChange({ base64String, file });
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        id={id}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        fullWidth
      >
        {label}
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </Button>
    </>
  );
};

FileUploadButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  toBase64: PropTypes.bool,
  maxSize: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(FileUploadButton);
