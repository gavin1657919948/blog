import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { FormlyModule } from '@ngx-formly/core'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap'

import { UiDataGridModule } from './components/data-grid/data-grid.module'

import { UiFormComponent } from './components/form/ui-form.component'

import { UiService } from './services/ui.service'
// import { FormService } from './services/form.service'

/**
 * Exported Modules
 * @type { Array }
 */
const modules = [UiDataGridModule, FormlyBootstrapModule]

/**
 * Exported Components
 * @type { Array }
 */
const components = [UiFormComponent]

/**
 * Exported Providers
 * @type { Array }
 */
const providers = [UiService]

/**
 * Exported Declarations
 * @type { Array }
 */
const declarations = []

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FormlyModule.forRoot(), ...modules],
  declarations: [...declarations, ...components],
  exports: [CommonModule, ...declarations, ...modules, ...components],
})
export class AlainUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AlainUiModule,
      providers: [...providers],
    }
  }
}
