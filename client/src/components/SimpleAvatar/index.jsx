import { useMemo } from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";

const SimpleAvatar = ({
  id,
  src = "",
  width = 24,
  height = 24,
  alt,
  sx = {},
}) => {
  const url = useMemo(() => {
    if (!src) {
      return "";
    }
    if (src.startsWith("data:image")) {
      return src;
    }
    return `${import.meta.env.VITE_REFERRAL_DOMAIN}:${
      import.meta.env.VITE_REFERRAL_PORT
    }/${src}`;
  }, [src]);

  return <Avatar id={id} src={url} alt={alt} sx={{ width, height, ...sx }} />;
};

SimpleAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  sx: PropTypes.object,
};

export default SimpleAvatar;
