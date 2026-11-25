// Only for a form that looks or behaves unlike the default (option cards, a
// summary step, a custom field type). Same engine as BuilderForm — you write the
// markup only. Ordinary forms: RenderForm in FormBlock, no file like this.
//
// Lighter option first: <BuilderForm renderField={…}> replaces chosen fields only.
'use client'
import { honeypotInputProps, useBuilderForm, type UseBuilderFormOptions } from '@intecion/ipal-kit/client'

export function QuoteCardsForm(props: UseBuilderFormOptions) {
  const f = useBuilderForm(props)
  if (f.isSuccess) return <div role="status">{f.resultMessage}</div>

  return (
    <form onSubmit={f.submit} noValidate>
      <input {...honeypotInputProps()} />
      {f.total > 1 && <p aria-live="polite">{props.texts.stepOf?.replace('{current}', String(f.stepIndex + 1)).replace('{total}', String(f.total))}</p>}

      {f.step.fields.map(({ field }) => {
        if (!field.name) return null
        if (field.blockType === 'radio') {
          // options as clickable cards — still a real radio group (keyboard, screen readers)
          return (
            <fieldset key={field.name} id={f.fieldId(field)} aria-invalid={f.getFieldProps(field)['aria-invalid']} aria-describedby={f.getFieldProps(field)['aria-describedby']}>
              <legend>{field.label}</legend>
              {(field.options ?? []).map((o, i) => (
                <label key={o.value} className="card">
                  <input {...f.getOptionProps(field, o, i)} className="sr-only" />
                  {o.label}
                </label>
              ))}
              {f.errors[field.name] && <p id={f.errorId(field)}>{f.errors[field.name]}</p>}
            </fieldset>
          )
        }
        return (
          <div key={field.name}>
            <label htmlFor={f.fieldId(field)}>{field.label}</label>
            {field.blockType === 'textarea' ? <textarea {...f.getTextareaProps(field)} /> : <input {...f.getInputProps(field)} />}
            {f.errors[field.name] && <p id={f.errorId(field)}>{f.errors[field.name]}</p>}
          </div>
        )
      })}

      {f.isLast && <f.TurnstileWidget />}
      {f.errorMessage && <p role="alert">{f.errorMessage}</p>}
      {!f.isFirst && <button type="button" onClick={f.back}>{props.texts.back}</button>}
      <button type="submit" disabled={f.isSubmitting}>{f.isLast ? props.form.submitButtonLabel : props.texts.next}</button>
    </form>
  )
}
