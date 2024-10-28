import React, { useState } from "react";
import GenericInput from "./GenericInput";
import { validateEmail } from "../utils/validateEmail";

interface EmailInputProps {
  name: string;
  placeholder: string;
  labelText: string;
  required?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
  name,
  placeholder,
  labelText,
}) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);

    if (validateEmail(value)) {
      setError("");
    } else {
      setError("E-mail inválido");
    }
  };

  return (
    <GenericInput
      type="email"
      name={name}
      placeholder={placeholder}
      labelText={labelText}
      error={!!error}
      helperText={error}
      value={email}
      onChange={handleChange}
    />
  );
};

export default EmailInput;
