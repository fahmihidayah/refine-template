import {
  RefineThemes,
  ThemedLayoutV2,
  notificationProvider,
} from "@refinedev/chakra-ui";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { IconBook, IconBook2, IconCategory, IconUser, IconUserCircle } from "@tabler/icons";
import { ChakraProvider, Icon } from "@chakra-ui/react";
import { Header } from "@components/header";
import { authProvider } from "src/authProvider";
import { dataProvider } from "../src/rest-data-provider";


const API_URL = "http://localhost:3001/api/v1";

export const BASE_API_URL = "http://localhost:3001/api/v1";
// const API_URL = "https://api.fake-rest.refine.dev";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2 Header={() => <Header sticky />}>
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return <>
    <RefineKbarProvider>
      {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
      <ChakraProvider theme={RefineThemes.Blue}>
        <Refine
          
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={notificationProvider}
          authProvider={authProvider}
          resources={[
            {
              name : "tasks",
              list : "/tasks",
              create : "/tasks/create",
              edit : "/tasks/edit/:id",
              show : "/tasks/show/:id",
              meta: {
                icon: <Icon as={IconBook2} />,
                canDelete: true,
              },
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                icon: <Icon as={IconCategory} />,
                canDelete: true,
                
              },
            }
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: "OYXUdV-SXi6gP-CSwU7y",
          }}
        >
          {renderComponent()}
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ChakraProvider>
    </RefineKbarProvider>
  </>;
}

export default MyApp;
