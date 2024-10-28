import { SessionProvider } from "next-auth/react";
import React from "react";
import RouteChangeListener from "./RouteChangeListener";

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <RouteChangeListener />
      {children}
    </SessionProvider>
  );
};

export default Wrapper;
