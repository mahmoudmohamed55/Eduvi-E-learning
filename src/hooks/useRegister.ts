import actAuthRegister from "@store/auth/act/actAuthRegister";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { signUpSchema, type FormValues } from "@validations/signUpSchema";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { resetUI } from "@store/auth/authSlice";
export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, email, password, confirmPassword } = data;
    dispatch(actAuthRegister({ name, email, password, confirmPassword }))
      .unwrap()
      .then((res) => {
        if (res) {
          navigate("/");
        }
      });
  };
  useEffect(() => {
    setFocus("name");
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
