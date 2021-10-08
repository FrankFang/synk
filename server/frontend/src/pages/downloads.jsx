import React from "react";
import { useQuery } from "../hooks/use_query";

export const Downloads = () => {
  const query = useQuery()
  return <div>hi {query.url}</div>;
};
