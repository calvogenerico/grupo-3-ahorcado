import * as React from "react";

type Props = {
  children: React.ReactNode,
  cond: boolean
}

export function When({cond, children}: Props) {
  return <>
    { cond ? children : null}
  </>
}
