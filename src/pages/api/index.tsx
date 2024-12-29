import axios from "axios";
import { getSession } from "next-auth/react";
import SERVER_URL from "../../services/server";

export async function getSessionDetails() {
  const response = await getSession()
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function ContactUs(name: string, email: string, message: string) {
  const data = { name, email, message };
  const response = await axios
    .post(`${SERVER_URL}/celebrity-management/contact/developer`, data)
    .then((res) => {
      if (res.status === 200) {
        return "Success";
      }
      return "Failed";
    })
    .catch((err) => err.message);
  return response;
}

export async function GetCelebrities() {
  const response = await axios
    .get(`${SERVER_URL}/celebrity-management/get-celebrities`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getCelebrity(celebrityId: any) {
  const response = await axios
    .get(`${SERVER_URL}/celebrity-management/get-celebrity/${celebrityId}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function createFreeAccount(accountDetails: any) {
  const response = await axios
    .post(`${SERVER_URL}/user-account/register`, accountDetails)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function getPromoCode(promoCode: string, token: string) {
  const response = await axios
    .get(`${SERVER_URL}/celebrity-management/get-promo-code/${promoCode}`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function doesActivePromoCodeExists(token: string) {
  const response = await axios
    .get(`${SERVER_URL}/celebrity-management/active-promo-code/verify`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function uploadReceipt(
  token: string,
  file: any,
  uploadPurpose: string
) {
  const response = await axios
    .post(
      `${SERVER_URL}/celebrity-management/upload-celebrity-receipt`,
      { file, uploadPurpose },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res)
    .catch((err) => err.message);

  return response;
}

export async function getActivityLog(token: string) {
  const response = await axios
    .get(`${SERVER_URL}/celebrity-management/activity-log`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function revokeToken(email: any) {
  const response = await axios
    .get(`${SERVER_URL}/logout/${email}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}
