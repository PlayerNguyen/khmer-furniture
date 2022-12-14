import AxiosInstance from "./AxiosInstance";

function postSignUpUser({ phone, email, firstName, lastName, password }) {
  return AxiosInstance.post("/users/register", {
    phone,
    email,
    firstName,
    lastName,
    password,
  });
}

function postSignInUser({ phoneOrEmail, password }) {
  return AxiosInstance.post("/auth/login", {
    phoneOrEmail,
    password,
  });
}

function getCurrentProfile(abort?: AbortController) {
  return AxiosInstance.get(`/users/profile`, {
    signal: abort ? abort.signal : undefined,
  });
}

function postChangeUserAvatar(formData: FormData) {
  if (!formData) {
    throw new Error("Form data cannot be undefined");
  }

  return AxiosInstance(`/users/avatar`, {
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}

function postChangePassword(currentPassword: string, newPassword: string) {
  return AxiosInstance.post(`/users/change-password`, {
    currentPassword,
    newPassword,
  });
}

function getUserAddressList(abortSignal?: AbortSignal) {
  return AxiosInstance.get(`/users/addresses`, { signal: abortSignal });
}

function postCreateUserAddress({
  contactPhone,
  streetName,
  provinceName,
  districtName,
  wardName,
}) {
  return AxiosInstance.post(`/users/address`, {
    contactPhone,
    streetName,
    provinceName,
    districtName,
    wardName,
  });
}

function deleteRemoveAddress(Id) {
  return AxiosInstance.delete(`/users/address/${Id}`);
}

const UserRequest = {
  postSignUpUser,
  postSignInUser,
  getCurrentProfile,
  postChangeUserAvatar,
  postChangePassword,
  getUserAddressList,
  postCreateUserAddress,
  deleteRemoveAddress,
};
export default UserRequest;
