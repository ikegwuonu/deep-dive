import React, { Fragment, PropsWithChildren } from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      {children}
      <Toaster richColors visibleToasts={1} theme="light" />
    </Fragment>
  );
};

export default Providers;
