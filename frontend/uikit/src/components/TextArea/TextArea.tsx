import { forwardRef } from 'react'
import { TextAreaProps } from './types'
import { FieldWrapper } from '@/lib'
import { useTextAreaStyles } from '@/components/TextArea/styles.ts'


const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
  {
    value = "",
    name,
    id,
    onChange,
    placeholder = 'Введите комментарий',
    className,
    disabled = false,
    error = false,
    label,
    onFocus,
    onBlur,
    minLength,
    maxLength,
    autoFocus,
    autoComplete,
    cols = 0,
    rows,
    hintText,
    dataTestId = "defaultDataTestId",
    readOnly,
    required,
    wrap,
    form,
    spellcheck,
    resize = 'none'
  },
  ref) => {

  const textAreaStyles = useTextAreaStyles({
    value: !!value,
    isDisable: disabled,
    error,
    cols: !!cols,
    resize
  })()

  return (
    <FieldWrapper
      className={className}
      label={label}
      hint={hintText}
      isDisabled={disabled}
      isInvalid={error}
      inputId={id}
      hasValue={!!value}
    >
      <textarea
        value={value}
        className={textAreaStyles.root}
        onChange={(event) => onChange?.(event)}
        onFocus={(event) => onFocus?.(event)}
        onBlur={(event) => onBlur?.(event)}
        placeholder={placeholder}
        name={name}
        cols={cols}
        rows={rows}
        wrap={wrap}
        ref={ref}
        form={form}
        maxLength={maxLength}
        minLength={minLength}
        id={id}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        readOnly={readOnly}
        required={required}
        data-test-id={dataTestId}
        disabled={disabled}
        spellCheck={spellcheck}
      />
    </FieldWrapper>
  )
})

TextArea.displayName = "TextArea";

export default TextArea;