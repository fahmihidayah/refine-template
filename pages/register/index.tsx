import { AuthPage } from "@components/pages/auth";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function Register() {
  return <AuthPage type="register" title={false}/>;
}

Register.noLayout = true;

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
