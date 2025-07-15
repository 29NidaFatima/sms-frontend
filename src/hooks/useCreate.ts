import {
  DefaultError,
  MutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { axiosAuthenticatedClient } from "@/lib/axios";

interface IParams<TVariable, TData, TError> {
  resource: string;
  /**
   * This flag automatically converts JSON to form data.
   */
  useFormData?: boolean;
  onSuccess?: (data: TData, params?: TVariable) => void;
  onError?: (error: TError, params?: TVariable) => void;
  mutationOptions?: Omit<
    MutationOptions<TData, TError, TVariable>,
    "mutationFn" | "onSuccess" | "onError"
  >;
}

export function useCreate<
  TVariable extends Record<string, unknown>,
  TData = unknown,
  TError = DefaultError,
>(params: IParams<TVariable, TData, TError>) {
  return useMutation<TData, TError, TVariable>({
    async mutationFn(variables) {
      const response = await axiosAuthenticatedClient(params.resource, {
        method: "POST",
        data: variables,
        headers: {
          "Content-Type": params.useFormData
            ? "multipart/form-data"
            : "application/json",
        },
      });

      return response.data;
    },
    onSuccess(data, variables) {
      params.onSuccess?.(data, variables);
    },
    onError(error, variables) {
      params.onError?.(error, variables);
    },
    ...(params.mutationOptions ?? {}),
  });
}
