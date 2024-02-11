import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLoginMutation } from "../../../services/api/authService";
import PrimaryButton from "../../buttons/PrimaryButton";
import ErrorMessage from "../../messages/ErrorMessage";
import Input from "../Input";
import schema from "./validation";

function LoginForm() {
  const { saveUser } = useAuth();

  const formMethods = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<LoginRequest> = (data) => submitForm(data);

  const [login, { error }] = useLoginMutation();

  const submitForm = async (data: LoginRequest) => {
    try {
      const res = await login(data).unwrap();
      saveUser(res);
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
