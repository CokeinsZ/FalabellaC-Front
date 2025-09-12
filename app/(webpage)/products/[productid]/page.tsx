"use client";

import { useEffect } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  // const params = useParams();
  console.log("router", params.id);

  useEffect(() => {
    console.log("parametros", params);
  }, [params]);
  return <div> {params.id}</div>;

  // props
}