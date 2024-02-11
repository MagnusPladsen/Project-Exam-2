import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../services/api/authService";
import PrimaryButton from "../../buttons/PrimaryButton";
import Input from "../Input";
import ErrorMessage from "../../messages/ErrorMessage";

function LoginForm() {
  const formMethods = useForm<LoginRequest>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<LoginRequest> = (data) => submitForm(data);

  const [login, { error }] = useLoginMutation();

  const submitForm = async (data: LoginRequest) => {
    await login(data)
      .then((res) => {
        console.log(res);
        /* dispatch(setCredentials({ user: res.data!, token: res.data.token }));
      navigate("/venues"); */
      })
      .catch((err) => console.log(err));
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
