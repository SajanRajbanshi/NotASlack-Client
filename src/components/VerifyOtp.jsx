import { Stack, TextField, Typography, Button } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import gmailIcon from "../assets/gmail-icon-logo-svgrepo-com.svg";
import outlookIcon from "../assets/outlook-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";


export default function VerifyOtp() {
  const [values, setValues] = useState(Array(6).fill(""));
  const textFieldRefs = useRef([]);
  const navigate = useNavigate();

  function handleChange(index, event) {
    let newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
    if(index===5)
    {
      performVerification(newValues);
    }
    if(!event.target.value)
    {
      return;
    }
    if (index < 5 && textFieldRefs.current[index + 1]) {
      textFieldRefs.current[index + 1].focus();
    }
  }
  function handleClick(index) {
    let newValues = [...values];
    newValues[index] = "";
    setValues(newValues);
  }
  function handleKeyDown(index, event) {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !values[index]
      &&
      textFieldRefs.current[index - 1]
    ) {
      textFieldRefs.current[index - 1].focus();
    }
  }

  function performVerification(code) {
    axios
      .post(`${API_BASE_URL}/auth/verify-otp`, {
        email: sessionStorage.getItem("email"),
        code: code.join(""),
      })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          if (response.data.isOldUser) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userName", response.data.name);
            navigate("/home");
          } else {
            navigate("/set-name");
          }
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log("error occured while verifying otp");
      });
  }

  return (
    <>
      <Stack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={2}
        marginTop={3}
        flexWrap={"wrap"}
        id="auth-verify-root"
      >
        <Stack
          direction={"column"}
          alignitems={"center"}
          justifyContent={"center"}
          gap={1}
          flexWrap={"wrap"}
          id="auth-verify-header-container"
          width={"600px"}
        >
          <Typography
            sx={{
              fontSize: "45px",
              fontWeight: "700",
              fontFamily: "lato",
              textAlign: "center",
              lineHeight: "45px",
            }}
          >
            Check your email for a code
          </Typography>
          <Stack direction={"row"} justifyContent={"center"} gap={1}>
            <Typography
              sx={{
                color: "#454245",
                fontWeight: "300",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              We have sent 6-character code to{" "}
              <strong>{sessionStorage.getItem("email")}</strong>. The code
              expires shortly, so please enter it soon.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={2}
          gap={3}
          sx={{ width: "500px" }}
          id="auth-verify-inputfields-container"
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Stack
              direction={"row"}
              sx={{
                border: "1px rgba(0,0,0,0.5) solid",
                overflow: "hidden",
                borderRadius: "8px",
              }}
              flexShrink={0}
            >
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px 0 0 6px",
                    height: "100px",
                    width: "80px",
                    fontFamily: "lato",
                    fontSize: "40px",
                    borderColor: "rgba(0,0,0,0.8)",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                onChange={(e) => handleChange(0, e)}
                value={values[0]}
                inputRef={(el) => (textFieldRefs.current[0] = el)}
                onKeyDown={(e) => handleKeyDown(0, e)}
                onClick={()=>handleClick(0)}
                inputProps={{ maxLength: 1 }}
                autoComplete="off"
              ></TextField>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0",
                    height: "100px",
                    width: "80px",
                    fontFamily: "lato",
                    fontSize: "40px",
                    borderColor: "rgba(0,0,0,0.8)",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                onChange={(e) => handleChange(1, e)}
                value={values[1]}
                inputRef={(el) => (textFieldRefs.current[1] = el)}
                onKeyDown={(e) => handleKeyDown(1, e)}
                onClick={()=>handleClick(1)}
                inputProps={{ maxLength: 1 }}
                autoComplete="off"
              ></TextField>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0 6px 6px 0",
                    height: "100px",
                    width: "80px",
                    fontFamily: "lato",
                    fontSize: "40px",
                    borderColor: "rgba(0,0,0,0.8)",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                onChange={(e) => handleChange(2, e)}
                value={values[2]}
                inputRef={(el) => (textFieldRefs.current[2] = el)}
                onKeyDown={(e) => handleKeyDown(2, e)}
                onClick={()=>handleClick(2)}
                inputProps={{ maxLength: 1 }}
                autoComplete="off"
              ></TextField>
            </Stack>
            <HorizontalRuleIcon
              sx={{
                fontSize: "15px",
                padding: "5px",
                color: "rgba(0,0,0,0.5)",
              }}
            />
            <Stack
              direction={"row"}
              sx={{
                border: "1px rgba(0,0,0,0.5) solid",
                overflow: "hidden",
                borderRadius: "8px",
              }}
              flexShrink={0}
            >
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px 0 0 6px",
                    height: "100px",
                    width: "80px",
                    fontFamily: "lato",
                    fontSize: "40px",
                    borderColor: "rgba(0,0,0,0.8)",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                onChange={(e) => handleChange(3, e)}
                value={values[3]}
                inputRef={(el) => (textFieldRefs.current[3] = el)}
                onKeyDown={(e) => handleKeyDown(3, e)}
                onClick={()=>handleClick(3)}
                inputProps={{ maxLength: 1 }}
                autoComplete="off"
              ></TextField>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0",
                    height: "100px",
                    width: "80px",
                    fontFamily: "lato",
                    fontSize: "40px",
                    borderColor: "rgba(0,0,0,0.8)",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                onChange={(e) => handleChange(4, e)}
                value={values[4]}
                inputRef={(el) => (textFieldRefs.current[4] = el)}
                onKeyDown={(e) => handleKeyDown(4, e)}
                onClick={()=>handleClick(4)}
                inputProps={{ maxLength: 1 }}
                autoComplete="off"
              ></TextField>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0 6px 6px 0",
                    height: "100px",
                    width: "80px",
                    fontFamily: "lato",
                    fontSize: "40px",
                    borderColor: "rgba(0,0,0,0.8)",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                onChange={(e) => handleChange(5, e)}
                value={values[5]}
                inputRef={(el) => (textFieldRefs.current[5] = el)}
                onKeyDown={(e) => handleKeyDown(5, e)}
                onClick={()=>handleClick(5)}
                inputProps={{ maxLength: 1 }}
                autoComplete="off"
              ></TextField>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          margin={"50px 0 0 0"}
          width={"40%"}
        >
          <Link
            to={"#"}
            style={{
              textDecoration: "none",
              display: "flex",
              direction: "row",
              alignItems: "center",
            }}
          >
            <img src={gmailIcon} style={{ width: "20px" }}></img>
            <Typography
              sx={{
                fontFamily: "lato",
                color: "rgba(0,0,0,0.8)",
                fontSize: "14px",
                fontWeight: 300,
                marginLeft: 1,
              }}
            >
              Open Gmail
            </Typography>
          </Link>
          <Link
            to={"#"}
            style={{
              textDecoration: "none",
              display: "flex",
              direction: "row",
              alignItems: "center",
            }}
          >
            <img src={outlookIcon} style={{ width: "20px" }}></img>
            <Typography
              sx={{
                fontFamily: "lato",
                color: "rgba(0,0,0,0.8)",
                fontSize: "14px",
                fontWeight: 300,
                marginLeft: 1,
              }}
            >
              Open Outlook
            </Typography>
          </Link>
        </Stack>
        <Typography
          sx={{ fontFamily: "lato", fontWeight: 320, fontSize: "14px" }}
        >
          Can't find your code? Check your spam folder!
        </Typography>
      </Stack>
    </>
  );
}
