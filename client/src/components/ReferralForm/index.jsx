import { memo, useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid, Button, Divider, Avatar } from "@mui/material";

// utils
import { MODES, EMAIL_REGEX_PATTERN } from "../../utils/staticConstants";
import { areObjectsEqual, validateField } from "../../utils/staticFunctions";
import { addressFields, personalDetailsFields } from "../../utils/formFields";

// hooks
import useInputValidation from "../../hooks/useInputValidation";

// Custom components
import TextField from "../TextField";
import FileUploadButton from "../FileUploadButton";
import SimpleAvatar from "../SimpleAvatar";

const ReferralForm = ({ id, onSave, mode = MODES[0], dataObj }) => {
  const phoneInputRef = useRef(null);
  const { onChangeValue, inputValue: phoneInput } = useInputValidation(
    "",
    phoneInputRef
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeName: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    country: "",
    avatarFile: "",
  });

  const [errors, setErrors] = useState({});

  const [displayAvatarFile, setDisplayAvatarFile] = useState("");

  useEffect(() => {
    if (dataObj) {
      setFormData(dataObj);
    }
  }, [dataObj]);

  const handleChange = useCallback(
    (e, code) => {
      let value = e.target.value;
      // If value is empty, do nothing. Just pass it.
      if (value && code === "phone") {
        value = onChangeValue(e) || phoneInput; // return only formatted phone number
      } else if (value && code === "email") {
        const validation = validateField(value, EMAIL_REGEX_PATTERN);
        if (validation.isError) {
          setErrors((prevState) => ({
            ...prevState,
            [e.target.name]: validation.helperText,
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [e.target.name]: null,
          }));
        }
      }
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
    },
    [onChangeValue, phoneInput]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "avatarFile" && formData[key]) {
          form.append(key, formData[key]); // Append the file
        } else {
          form.append(key, formData[key]); // Append other form fields
        }
      });
      onSave(form);
    },
    [formData]
  );

  const handleFileChange = useCallback((fileObj) => {
    setDisplayAvatarFile(fileObj.base64String);
    setFormData((prevState) => ({ ...prevState, avatarFile: fileObj.file }));
  }, []);

  return (
    <Box id={id}>
      <Typography variant="h6" mb={3}>
        Referral Builder
      </Typography>
      <Box sx={{ display: "flex" }}>
        {(displayAvatarFile || formData.avatarFile) && (
          <SimpleAvatar
            id="ReferralForm-SimpleAvatar"
            src={
              displayAvatarFile || (typeof formData.avatarFile === "string"
                ? formData.avatarFile
                : "")
            }
            sx={{ marginRight: "8px" }}
          />
        )}
        <Typography variant="subtitle1">Personal Details</Typography>
      </Box>
      <Divider />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: "16px" }}>
        <Grid container spacing={2}>
          {personalDetailsFields.map(
            ({ code, required, label, placeholder }) => (
              <Grid key={code} item xs={12} md={6}>
                <TextField
                  id={`${code}-textField`}
                  fullWidth
                  required={required}
                  label={label}
                  name={code}
                  value={formData?.[code]}
                  onChange={(e) => handleChange(e, code)} // needed for additional validation
                  readOnly={mode === MODES[0]} // for view mode only
                  placeholder={placeholder}
                  error={!!errors[code]}
                  helperText={errors[code]}
                />
              </Grid>
            )
          )}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Address</Typography>
            <Divider />
          </Grid>
          {addressFields.map(({ code, required, label, placeholder }) => (
            <Grid key={code} item xs={12} md={6}>
              <TextField
                id={`${code}-textField`}
                fullWidth
                required={required}
                label={label}
                name={code}
                value={formData?.[code]}
                onChange={handleChange}
                readOnly={mode === MODES[0]} // for view mode only
                placeholder={placeholder}
              />
            </Grid>
          ))}
          {mode !== MODES[0] && (
            <>
              <Grid item xs={12} md={6}>
                <FileUploadButton
                  id="referralForm-FileUploadButton"
                  label="Upload Avatar"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={areObjectsEqual(formData, dataObj)}
                >
                  {`${dataObj ? "Update" : "Create"} Referral`}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

ReferralForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  dataObj: PropTypes.object,
  editable: PropTypes.bool,
  mode: PropTypes.oneOf(MODES),
};

export default memo(ReferralForm);
