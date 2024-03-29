import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLoginMutation } from "../../../services/api/authService";
import PrimaryButton from "../../buttons/PrimaryButton.component";
import ErrorMessage from "../../messages/ErrorMessage.component";
import Input from "../Input.component";
import schema from "./validation";
import { LoginRequest } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  const formMethods = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<LoginRequest> = (data) => submitForm(data);

  const [login, { error }] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again!"
  );

  const submitForm = async (data: LoginRequest) => {
    try {
      const res = await login(data).unwrap();
      saveUser(res);
      navigate("/venues");
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-2">
          <Input name="email" type="email" label="Email" />
          <Input name="password" type="password" label="Password" />
        </div>
        <div id="button" className="flex flex-col w-full my-5 gap-6">
          <PrimaryButton type="submit" className="w-full">
            Log in
          </PrimaryButton>
          <ErrorMessage message={errorMessage} show={!!error} />
        </div>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
