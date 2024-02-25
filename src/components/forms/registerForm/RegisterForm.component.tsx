import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import sanitizeUrl from "../../../formatters/sanitizeUrl";
import useAuth from "../../../hooks/useAuth";
import { useRegisterMutation } from "../../../services/api/authService";
import { RegisterRequest } from "../../../types/types";
import PrimaryButton from "../../buttons/PrimaryButton.component";
import ErrorMessage from "../../messages/ErrorMessage.component";
import Input from "../Input.component";
import Toggle from "../Toggle.component";
import schema from "./validation";

function RegisterForm() {
  const { saveUser } = useAuth();

  const formMethods = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      venueManager: false,
    },
  });

  const { handleSubmit, setValue, getValues, watch } = formMethods;

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => submitForm(data);

  const [register, { error }] = useRegisterMutation();

  const [errorMessage, setErrorMessage] = useState<string>(
    "Something went wrong. Please try again!"
  );

  const submitForm = async (data: RegisterRequest) => {
    try {
      const res = await register(data).unwrap();
      saveUser(res);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-2">
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
            placeholder="https://example.com/avatar.png"
          />
          <div className="flex flex-col w-full gap-2">
            <label
              htmlFor={"venueManager"}
              className={` text-left text-gray-500`}
            >
              Venue manager
            </label>
            <div className="w-full flex ">
              <Toggle
                onChange={() =>
                  setValue("venueManager", !getValues("venueManager"))
                }
                value={watch("venueManager")}
              />
            </div>
          </div>
        </div>
        <div id="button" className="flex flex-col w-full my-5 gap-6">
          <PrimaryButton type="submit" className="w-full">
            Register
          </PrimaryButton>
          <ErrorMessage message={errorMessage} show={!!error} />
        </div>
      </form>
    </FormProvider>
  );
}

export default RegisterForm;
