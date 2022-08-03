/* eslint-disable @typescript-eslint/no-empty-function */
import axios from "axios";

const axiosInstance = axios.create({ validateStatus: status => status < 500 });

interface ApiCallOptions<T, D> {
  /*
   * HTTP method to use for the request.
   */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /*
   * URL to send the request to.
   */
  url: string;
  /*
   * Authorization token to send with the request.
   * Authorization Header: Authorization: Bearer <token>
   */
  token?: string;
  /*
   * JSON data to send with the request.
   */
  json?: D;
  /*
   * Form data to send with the request.
   */
  formData?: FormData;
  /*
   * Callback to call with the response data.
   * when the response status >=200 || < 300.
   */
  onSuccess?: (data: T) => void;
  /*
   * Callback to call with the error.
   * when the response is not successful.
   */
  onFail?: (data: unknown) => void;
}
interface ErrorMessageResponse {
  message: string;
}

interface FormErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: {
    [key: string]: string[];
  };
}

/*
 * Helper function to make API calls.
 */
export async function apiCall<T, D>({
  method = "POST",
  url,
  token,
  json,
  formData,
  onSuccess = () => {},
  onFail = () => {},
}: ApiCallOptions<T, D>): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let data;
  if (json) data = json;
  if (formData) data = formData;
  if (json && formData) throw new Error("Cannot send both json and formData");

  const res = await axiosInstance({ url, method, headers, data });
  if (res.status >= 200 && res.status < 300) {
    const out: T = res.data;
    onSuccess(out);
    return out;
  }

  const err = res.data;
  onFail(err);
  if (res.status === 400) {
    if (err.message) {
      throw new Error((err as ErrorMessageResponse).message);
    }
    if (err.title) {
      const formError = err as FormErrorResponse;
      const errors = [formError.title];
      Object.keys(formError.errors).forEach(key => {
        errors.push(...formError.errors[key]);
      });
      throw new Error(errors.join("\n"));
    }
  }
  throw new Error("Someting went wrong");
}

type IFormData<T> = {
  [K in keyof T]?: string | Blob;
};

/*
 * Helper function to convert object to FormData
 */
export function getFormData<T extends IFormData<T>>(
  form: T,
  allowEmpty = false
): FormData {
  const formData = new FormData();
  Object.keys(form).forEach(key => {
    const value = form[key as keyof T];
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    } else if (allowEmpty) {
      formData.append(key, "");
    }
  });
  return formData;
}

interface ApiConfig {
  url: string;
}

type ApiOptions<T, D> = Pick<ApiCallOptions<T, D>, "onSuccess" | "onFail">;

/*
 * Helper function for crud operations.
 */
export function crudApi<R, F extends IFormData<F>>({ url }: ApiConfig) {
  return (token?: string) => ({
    get(id: string, options?: ApiOptions<R, F>): Promise<R> {
      return apiCall({ url: `${url}/${id}`, method: "GET", token, ...options });
    },

    list(options?: ApiOptions<R[], F>): Promise<R[]> {
      return apiCall({ url, method: "GET", token, ...options });
    },
    create(form: F, options?: ApiOptions<R, F>): Promise<R> {
      return apiCall({
        url,
        method: "POST",
        formData: getFormData(form, true),
        token,
        ...options,
      });
    },
    update(id: string, form: F, options?: ApiOptions<R, F>): Promise<R> {
      return apiCall({
        url: `${url}/${id}`,
        method: "PUT",
        formData: getFormData(form),
        token,
        ...options,
      });
    },
    delete(id: string, options?: ApiOptions<void, F>): Promise<void> {
      return apiCall({
        url: `${url}/${id}`,
        method: "DELETE",
        token,
        ...options,
      });
    },
  });
}
