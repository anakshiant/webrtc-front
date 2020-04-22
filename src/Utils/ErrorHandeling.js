import { deleteAllCookies } from "./Cookies";
import { LOGIN_PATH } from "./RouteUrl";
import { getBaseUrl } from "./urlUtils";
let errorForSomethingWentWrong = "Something went wrong. Please try again.";
export default async function getFailureResponse(result) {
  if (result.status === 401) {
    deleteAllCookies();
    window.location.href = `${getBaseUrl()}/${LOGIN_PATH}`
      .replace("///", "/")
      .replace("//", "/");
    return;
  }
  if (result.status >= 300) {
    const response = await result.json();

    return { status: true, error: response.message };
  }
  const response = await result.json();

  if (response.code === 400) {
    return { status: true, error: response.message };
  } else if (response.code === 404) {
    return { status: true, error: response.message };
  } else if (response.code === 500) {
    return { status: true, error: errorForSomethingWentWrong };
  } else if (response.code === 200 || response.data) {
    return { status: false, data: response.data };
  } else {
    return { status: false, data: response };
  }
}
