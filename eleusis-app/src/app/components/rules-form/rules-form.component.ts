import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.scss']
})
export class RulesFormComponent implements OnInit {

  @Output() formCompletedEvent = new EventEmitter<any>();

  private lastValue = false;

  public numericRulesArray: string[] = [
    `be a multiple of`,
    `be greater than`,
    `be less than`,
    `contain the number`,
  ];
  public colorRulesArray: string[] = [
    `can't have the symbol`,
    // `should follow the order`
  ]

  public selectedRulesForm: FormGroup;
  // Reglas numéricas
  public enableNumericRule: FormControl = new FormControl('');
  public numericRuleControl: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  public numericRuleValue: FormControl = new FormControl({ value: '', disabled: true }, [
    Validators.max(13),
    Validators.min(1),
    Validators.required,
  ]);
  // Reglas color
  public enableColorRule: FormControl = new FormControl('');
  public colorRuleControl: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  public colorRuleValue: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);

  constructor(
    private gameService: GameService,
  ) {
    this.selectedRulesForm = new FormGroup({
      numericRule: this.numericRuleControl,
      numericRuleValue: this.numericRuleValue,
      enableNumericRule: this.enableNumericRule,

      colorRule: this.colorRuleControl,
      colorRuleValue: this.colorRuleValue,
      enableColorRule: this.enableColorRule,
    });
  }

  public ToggleNumericRules(): void {
    if (this.enableNumericRule.value) {
      this.numericRuleControl.enable();
      this.numericRuleValue.enable();

      // DESACTIVAR LOS OTROS CAMPOS
      this.enableColorRule.setValue(false);
      this.colorRuleControl.disable();
      this.colorRuleValue.disable();
    } else {
      this.numericRuleControl.disable();
      this.numericRuleValue.disable();
    }

    this.selectedRulesForm.updateValueAndValidity();
  }

  public ToggleColorRules(): void {
    if (this.enableColorRule.value) {
      this.colorRuleControl.enable();
      this.colorRuleValue.enable();

      // DESACTIVAR LOS OTROS CAMPOS
      this.enableNumericRule.setValue(false);
      this.numericRuleControl.disable();
      this.numericRuleValue.disable();
    } else {
      this.colorRuleControl.disable();
      this.colorRuleValue.disable();
    }

    this.selectedRulesForm.updateValueAndValidity();
  }

  public SetRule(): any {
    const rule: any = [];

    if (this.enableNumericRule.value) {
      rule.push(0);
      rule.push(this.numericRuleControl.value);
      rule.push(this.numericRuleValue.value);
    } else {
      rule.push(1);
      rule.push(this.colorRuleControl.value);
      rule.push(this.colorRuleValue.value);
    }

    return (rule);
  }

  public RuleChanged(): void {

    if (this.selectedRulesForm.valid && (this.enableColorRule.value || this.enableNumericRule.value)) {
      const newRule = this.SetRule();
      this.formCompletedEvent.emit({
        valid: true,
        rule: newRule,
      });

    } else {
      this.formCompletedEvent.emit({
        valid: false
      })
    }
  }

  ngOnInit(): void {
    this.selectedRulesForm.valueChanges.subscribe(() =>{
      if (this.lastValue !== this.selectedRulesForm.valid) {
        this.lastValue = this.selectedRulesForm.valid;
        this.RuleChanged();
      }
    })
  }

}
