export interface DataGuardProps<T> {
  whenExist: T | null | undefined;
  children?: (data: NonNullable<T>) => JSX.Element;
}

