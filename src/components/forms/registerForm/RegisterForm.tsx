import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "../../../services/api/authService";
import PrimaryButton from "../../buttons/PrimaryButton";
import ErrorMessage from "../../messages/ErrorMessage";
import FormErrorMessage from "../../messages/FormErrorMessage";
import Input from "../Input";
import schema from "./validation";
import sanitizeUrl from "../../../formatters/sanitizeUrl";

function RegisterForm({
  setRegister,
}: {
  setRegister: (value: boolean) => void;
}) {
  const formMethods = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue } = formMethods;

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => submitForm(data);

  const [register, { error }] = useRegisterMutation();

  const submitForm = async (data: RegisterRequest) => {
    await register(data)
      .unwrap()
      .then(() => {
        setRegister(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input name="name" type="name" label="Name" />
        <Input name="email" type="email" label="Email" />
        <Input name="password" type="password" label="Password" />
        <Input
          name="avatar"
          type="url"
          label="Avatar (optional)"
          onBlur={(e) => {
            const sanitizedUrl = sanitizeUrl(e.target.value);
            console.log(sanitizedUrl);
            setValue("avatar", sanitizedUrl);
          }}
        />
        <Input name="venueManager" type="checkbox" label="Venue manager" />

        <div id="button" className="flex flex-col w-full my-5 gap-6">
          <PrimaryButton type="submit" className="w-full">
            Register
          </PrimaryButton>
          {error && <ErrorMessage />}
        </div>
      </form>
    </FormProvider>
  );
}

export default RegisterForm;
