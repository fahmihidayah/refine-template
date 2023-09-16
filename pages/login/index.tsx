
import { AuthPage } from "@components/pages/auth";
import { useLogin } from "@refinedev/core";

import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

type LoginVariables = {
  email: string;
  password: string;
};

export default function Login() {
  const { mutate } = useLogin<LoginVariables>();
  return (
    <AuthPage
      type="login"
      title={false}
      formProps={{
        defaultValues: { email: "demo@refine.dev", password: "demodemo" },
        onSubmit: async (values) => {
          console.log(values)
          await mutate(values);
        }
      }}
    />
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: redirectTo ?? "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
