import React, { Suspense } from "react";
import { Preloader } from "../components/common/";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<Preloader />}>
        <WrappedComponent {...(props as WCP)} />
      </Suspense>
    );
  };
}
