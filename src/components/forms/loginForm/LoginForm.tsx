import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../services/api/authService";
import PrimaryButton from "../../buttons/PrimaryButton";
import Input from "../Input";
import ErrorMessage from "../../messages/ErrorMessage";
import schema from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  selectCurrentUser,
  setCredentials,
} from "../../../redux/slices/authSlice";
import { useEffect } from "react";

function LoginForm() {
  const formMethods = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<LoginRequest> = (data) => submitForm(data);

  const [login, { error }] = useLoginMutation();

  const submitForm = async (data: LoginRequest) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);
      dispatch(setCredentials({ user: res, token: res.accessToken }));
      navigate("/venues");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input name="email" type="email" label="Email" />
        <Input name="password" type="password" label="Password" />

        <div id="button" className="flex flex-col w-full my-5 gap-6">
          <PrimaryButton type="submit" className="w-full">
            Log in
          </PrimaryButton>
          {error && <ErrorMessage />}
        </div>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
