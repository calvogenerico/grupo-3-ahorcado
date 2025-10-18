
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => Promise<any>;

type AsyncAction<T extends Fn> = {
  waiting: boolean;
  ready: boolean;
  res: Awaited<ReturnType<T>> | undefined;
  call: (...args: Parameters<T>) => void | Promise<void>;
}

export function useAsyncAction<T extends Fn>(callback: T): AsyncAction<T> {
  const [waiting, setWaiting] = useState(false);
  const [ready, setReady] = useState(false);
  const [res, setRes] = useState<AsyncAction<T>['res']>(undefined);
  const call = async (...args: Parameters<T>) => {
    setWaiting(true);
    const res = await callback(...args);
    setRes(res);
    setWaiting(false);
    setReady(true);
  };

  return {
    call,
    waiting,
    res,
    ready
  }
}
