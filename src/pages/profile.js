import { useCookies } from "react-cookie";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./css/profile.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import { InboxOutlined } from "@ant-design/icons";
import React from "react";
import { message, Upload } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import LoadingPage  from "../components/IsLoading/Loading";

const useGetUserProfileInfo = (userID, userToken,counter) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfileInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PATH}/auth/getUserInfo/${userID}`,
          { headers: { Authorization: userToken } }
        );
        setData(response.data.UserInfo);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile info:', error);
        setIsLoading(false);
      }
    };

    fetchUserProfileInfo();
  }, [userID, userToken, counter]);

  return { data, isLoading };
};

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token", "access_ID"]);
  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const { Dragger } = Upload;
  const userID = cookies.access_ID;
  const userToken = cookies.access_token;
  const [counter, setCounter] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const schema = yup.object().shape({
    password: yup
      .string()
      .max(32, "Password must be at most 32 characters long")
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .max(32, "Confirm Password must be at most 32 characters long")
      .min(8, "Confirm Password must be at least 8 characters long")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadButton = (
    <button
      className="btn btn-lg px-4 px-md-5 text-uppercase saveBtn"
      type="button"
      onClick={handleClickOpen}
    >
      Upload Profile picture
    </button>
  );

  const { data, isLoading } = useGetUserProfileInfo(userID, userToken, counter);

  const deleteImage = async() =>{
    let LoadingTrue = true;
    try{
      LoadingTrue && message.loading("loading");
      const response = await axios.put(
        `${process.env.REACT_APP_API_PATH}/auth/deleteProfile/${userID}`,
        null,
        {
          headers: { Authorization: userToken },
        }
      );
      const data = response.data;
      message.success(data.message);
    } catch (err) {
      message.error(err);
    } finally {
      LoadingTrue = false;
      setCounter(counter + 1);
    }
  }

  const UpdateNewsLetter = async () => {
    let LoadingTrue = true;
    try {
      LoadingTrue && message.loading("loading");
      const response = await axios.put(
        `${process.env.REACT_APP_API_PATH}/auth/ChangeNewsLetter/${userID}`,
        null,
        {
          headers: { Authorization: userToken },
        }
      );
      const data = response.data;
      message.success(data.message);
    } catch (err) {
      message.error(err);
    } finally {
      LoadingTrue = false;
      setCounter(counter + 1);
    }
  };

  //   const {data} = axios.get(process.env.REACT_APP_API_PATH)
  const navigate = useNavigate();
  const fieldStyle = {
    height: "100%",
    width: "100%",
  };

  const Onsubmit = async (info) => {
    let LoadingTrue = true;
    try {
      LoadingTrue && message.loading("loading");
      const exportedData = {
        userName: data.username,
        newPassword: info.password,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_PATH}/auth/resetPassword`,
        exportedData
      );
      response.data.flag
        ? message.success(response.data.message)
        : message.error(response.data.message);
      reset();
    } catch (err) {
      message.error(err);
    } finally {
      LoadingTrue = false;
    }
  };

  const changePasswordVisibility = () => {
    return setShowPassword(!showPassword);
  };

  const changeConfirmPasswordVisibility = () => {
    return setShowConfirmPassword(!showConfirmPassword);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  const handleUpload = async () => {
    if (uploadedFile) {

      const base64 = await convertImageToBase64(uploadedFile);
      await axios.post(`${process.env.REACT_APP_API_PATH}/auth/upload/${userID}`,
      {base64, type: uploadedFile.type},
      {
        headers: { Authorization: userToken },
      })
      .then(response => message.success(response.data.message))
      .catch(err => message.error(err))
      .finally( ()=>{
        setUploadedFile(null);
        setOpen(false);
        setCounter(counter+1);
        window.location.reload();
      }

        );
    } 
    else {
      message.error("An image need to be present before uploading");
    }
  };

  const props = {
    name: "file",
    multiple: false,
    listType: "picture",

    beforeUpload(file) {
      const previewImage = new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            ctx.fillText("Ant Design", 20, 20);
            canvas.toBlob((result) => setPreviewImage(result));
          };
        };
      });
      setUploadedFile(file);
      previewImage();
      const isPNG = file.type === "image/png";
      const isLessThan1MB = file.size <= 1 * 1024 * 1024; // 1 MB
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
        return Upload.LIST_IGNORE;
      }
      if (!isLessThan1MB) {
        message.error(`${file.name} is larger than 1MB`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const sendButton = document.createElement("button");
        sendButton.textContent = "Send Image";
        sendButton.onclick = () => {
          // Logic to send the uploaded image
          const formData = new FormData();
          formData.append("file", info.file.originFileObj);

          fetch("/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Image sent successfully:", data);
            })
            .catch((error) => {
              console.error("Error sending image:", error);
            });
        };
        info.file.dom.appendChild(sendButton);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        console.log("Upload error:", info.file.error);
      }
    },
    onDrop(info) {
      console.log("Dropped files", info.fileList);
    },
    OnUpload: handleUpload, 
  };

  function logOut() {
    setCookies("access_token", "");
    setCookies("access_ID", "");
    localStorage.clear();
    googleLogout();
    setCounter(counter+1);
    navigate("/");
  }
  return isLoading ? (
    <LoadingPage/>
  ) : (
    <div className="container my-5">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <p className="m-0 fs-1 text-center fw-medium">PROFILE</p>
        <button
          onClick={() => {
            return setCounter(counter + 1);
          }}
          className="saveBtn btn btn-lg btn-primary px-4 px-md-5 text-uppercase"
        >
          Refresh
        </button>
      </div>
      <hr />
      {data.profilePic.path == null ? 
      <div>
        <>
         {uploadButton}
        </>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Dragger {...props} maxCount={1} className="p-3 rounded-3">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
            {previewImage && (
              <div className="d-flex justify-content-center align-items-center my-3">
                <button
                  onClick={props.OnUpload}
                  className="btn btn-md btn-primary"
                >
                  Upload Image
                </button>
              </div>
            )}
          </Dialog>
      </div>
      :
      <div className="d-flex flex-wrap pt-3 pt-md-5 pb-4 mb-2 align-items-center">
        <img
          className="image-profile me-4"
          alt="profilePicture"
          src={data.profilePic.path}
        />
        <div>
          <button
            onClick={handleClickOpen}
            className=" saveBtn btn btn-lg btn-primary px-4 px-md-5 ml-2 ml-md-4 me-2 me-md-4 mt-sm-3 mt-4 mt-md-0"
          >
            Change Photo
          </button>
          <button 
          onClick={deleteImage}
          className="btn btn-lg btn-outline-dark px-4 px-md-5 ml-2 ml-md-4 mt-4 mt-md-0">
            Delete
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Dragger {...props} maxCount={1} className="p-3 rounded-3">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
            {previewImage && (
              <div className="d-flex justify-content-center align-items-center my-3">
                <button
                  onClick={props.OnUpload}
                  className="btn btn-md btn-primary"
                >
                  Upload Image
                </button>
              </div>
            )}
          </Dialog>
        </div>
      </div>      
    }

      <div className="row my-4">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit(Onsubmit)}>
            <div className="row row-gap-2 row-gap-md-4 mb-5">
              <div className="col-sm-6">
                <TextField
                  sx={fieldStyle}
                  id="standard-read-only-input"
                  label="Username"
                  defaultValue={data.username}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="col-sm-6">
                <TextField
                  sx={fieldStyle}
                  id="standard-read-only-input"
                  label="Email"
                  defaultValue={data.email}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>

              <div className="col-sm-6">
                <TextField
                  sx={fieldStyle}
                  id="standard-password-input"
                  label="Password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        onClick={() => {
                          changePasswordVisibility();
                        }}
                        title="show Password"
                        className="pointer-auto"
                        position="start"
                      >
                        {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password?.message ? (
                  <FormHelperText
                    className="text-danger"
                    id="component-error-text"
                  >
                    {errors.password?.message}
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-sm-6">
                <TextField
                  sx={fieldStyle}
                  id="standard-password-input"
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="current-password"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        onClick={() => {
                          changeConfirmPasswordVisibility();
                        }}
                        title="show Password"
                        className="pointer-auto"
                        position="start"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.confirmPassword?.message ? (
                  <FormHelperText
                    className="text-danger"
                    id="component-error-text"
                  >
                    {errors.confirmPassword?.message}
                  </FormHelperText>
                ) : (
                  <></>
                )}
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="fs-6 m-0 p-0 btn btn-sm text-end change-text"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="row my-5">
            <p className="m-0 fs-3 fw-semibold mb-2">Newsletter</p>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <p className="m-0 fs-sm-6 fs-md-5 fw-semibold">
                {data.newsLetter
                  ? "You are currently subscribe to our newsLetter"
                  : "You are currently Unsubscribe to our newsLetter"}
              </p>
              <button
                onClick={() => {
                  UpdateNewsLetter();
                }}
                className="btn btn-lg btn-outline-dark px-4 px-md-5 ml-2 ml-md-4"
              >
                {data.newsLetter ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center my-5">
            <Button
              onClick={() => {
                logOut();
              }}
              sx={{
                color: "black",
              }}
              className="fs-6"
              startIcon={<ExitToAppIcon fontSize="large" />}
            >
              SignOut
            </Button>
            <p className="m-0 change-text">Delete Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
