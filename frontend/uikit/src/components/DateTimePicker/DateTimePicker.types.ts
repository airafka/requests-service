import { CustomDatePickerProps } from "../DatePicker/types";

export interface TimeInterval {
  from: string;
  to: string;
}

export type ValidationReason =
  | "missing_date"
  | "missing_time"
  | "missing_interval"
  | "invalid_date";

export interface ValidationState {
  isValid: boolean;
  reason?: ValidationReason;
  message?: string;
}

export interface DateTimePickerProps extends CustomDatePickerProps {
  chosenInterval?: TimeInterval;
  timeIntervals?: { [key: string]: TimeInterval[] };
  onIntervalChange?: ({
    dates,
    interval,
  }: {
    dates: [Date, Date];
    interval: TimeInterval;
  }) => void;
  isExactTime?: boolean;
  /**
   * требует обязательного выбора времени/интервала.
   * при true компонент не отдаёт наружу только дату без времени
   * @default false
   */
  requiredTime?: boolean;
  /**
   * callback для отслеживания состояния валидации.
   * вызывается при каждом изменении валидности поля.
   */
  onValidationChange?: (state: ValidationState) => void;
  isTable?: boolean;
}
