import { useState } from "react";

// type Fn<T extends (...args: Parameters<T>) => ReturnType<T>> =

type AsyncAction<Arg, Ret> = {
  waiting: boolean;
  ready: boolean;
  res: Ret | undefined;
  call: (a: Arg) => Promise<Ret>
}

export function useAsyncAction<Arg, Ret>(callback: (a: Arg) => Promise<Ret>): AsyncAction<Arg, Ret> {
  const [waiting, setWaiting] = useState(false);
  const [res, setRes] = useState<Ret | undefined>(undefined);
  const [ready, setReady] = useState<boolean>(false);
  const call = async (arg: Arg): Promise<Ret> => {
    setWaiting(true);
    const res = await callback(arg).finally(() => setReady(true));
    setRes(res);
    setWaiting(false);
    return res;
  }

  return {
    waiting,
    call,
    res,
    ready
  }
}
