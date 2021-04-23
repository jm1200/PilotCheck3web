import { useMeQuery } from "../generated/graphql";

import { useEffect } from "react";
import { useHistory } from "react-router";

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useHistory();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/login");
    }
  }, [loading, data, router]);
};
