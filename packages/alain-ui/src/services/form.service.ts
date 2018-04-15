import { Injectable } from '@angular/core'
import { Validators } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
@Injectable()
export class FormService {
  field(type, templateType, key, options: any = {}): FormlyFieldConfig {
    const templateOptions = {
      type: templateType,
    }

    const validators = {
      validation: Validators.compose([Validators.required]),
    }

    const toKeys = ['disabled', 'label', 'options', 'placeholder']

    toKeys.forEach(toKey => {
      if (options[toKey]) {
        templateOptions[toKey] = options[toKey]
      }
    })
    const defaultValue = options.defaultValue
    return {
      key,
      type,
      defaultValue,
      templateOptions,
      validators,
    }
  }

  input(key, options: any = {}) {
    return this.field('input', 'text', key, options)
  }

  email(key, options: any = {}) {
    return this.field('input', 'email', key, options)
  }

  password(key, options: any = {}) {
    return this.field('input', 'password', key, options)
  }

  date(key, options: any = {}) {
    return this.field('input', 'date', key, options)
  }

  textarea(key, options: any = {}) {
    return this.field('textarea', 'text', key, options)
  }

  wysiwyg(key, options: any = {}) {
    return this.field('wysiwyg', 'text', key, options)
  }

  select(key, options: any = {}) {
    return this.field('select', 'text', key, options)
  }
}
