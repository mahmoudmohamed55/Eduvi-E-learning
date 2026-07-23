
import { useAppDispatch, useAppSelector } from "@store/hooks";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { resetUI } from "@store/auth/authSlice";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { signInSchema, type LoginFormValues } from "@validations/signInSchema";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const {  email, password } = data;
    dispatch(actAuthLogin({  email, password }))
      .unwrap()
      .then((res) => {
        if (res) {
          navigate("/");
        }
      });
  };
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    navigate,
    loading,
    error,
    accessToken,
  };
};
