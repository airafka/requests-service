import type { ValidationState, ValidationReason } from "./DateTimePicker.types";

const VALIDATION_MESSAGES: Record<ValidationReason, string> = {
  missing_date: "Укажите дату",
  missing_time: "Укажите время",
  missing_interval: "Выберите интервал времени",
  invalid_date: "Некорректная дата",
};

interface GetValidationStateParams {
  date: Date | null;
  isDateValid: boolean;
  isExactTime: boolean;
  time: Date | null | undefined;
  timeTouched: boolean;
  timeInterval: { from: string; to: string } | undefined;
  requiredTime: boolean;
}

export function getValidationState({
  date,
  isDateValid,
  isExactTime,
  time,
  timeTouched,
  timeInterval,
  requiredTime,
}: GetValidationStateParams): ValidationState {
  // если requiredTime === false, всегда валидно
  if (!requiredTime) {
    return { isValid: true };
  }

  if (!date) {
    return {
      isValid: false,
      reason: "missing_date",
      message: VALIDATION_MESSAGES.missing_date,
    };
  }

  if (!isDateValid) {
    return {
      isValid: false,
      reason: "invalid_date",
      message: VALIDATION_MESSAGES.invalid_date,
    };
  }

  if (isExactTime) {
    if (!timeTouched || !time) {
      return {
        isValid: false,
        reason: "missing_time",
        message: VALIDATION_MESSAGES.missing_time,
      };
    }
  } else {
    if (!timeInterval) {
      return {
        isValid: false,
        reason: "missing_interval",
        message: VALIDATION_MESSAGES.missing_interval,
      };
    }
  }

  return { isValid: true };
}
