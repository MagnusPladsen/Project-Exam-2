import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import sanitizeUrl from "../../../formatters/sanitizeUrl";
import useAuth from "../../../hooks/useAuth";
import { useRegisterMutation } from "../../../services/api/authService";
import { RegisterRequest } from "../../../types/types";
import PrimaryButton from "../../buttons/PrimaryButton.component";
import ErrorMessage from "../../messages/ErrorMessage.component";
import Input from "../Input.component";
import schema from "./validation";

function RegisterForm() {
  const { saveUser } = useAuth();

  const formMethods = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue } = formMethods;

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => submitForm(data);

  const [register, { error }] = useRegisterMutation();

  const submitForm = async (data: RegisterRequest) => {
    try {
      const res = await register(data).unwrap();
      saveUser(res);
    } catch (err) {
      console.log(err);
    }
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
          required={false}
          onBlur={(e) => {
            if (!e.target.value) return;
            const sanitizedUrl = sanitizeUrl(e.target.value);
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
