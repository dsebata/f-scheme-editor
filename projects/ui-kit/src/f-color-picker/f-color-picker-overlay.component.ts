import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MatFormField } from '@angular/material/form-field';
import { AbstractControlDirective, NgControl } from '@angular/forms';
import { matSelectAnimations } from '@angular/material/select';
import { FColorPickerComponent } from './f-color-picker/f-color-picker.component';
import { FColorPickerRectComponent } from './f-color-picker-rect/f-color-picker-rect.component';
import { FOverlayPanelBase } from '../f-overlay-panel';

@Component({
  selector: 'f-color-picker-overlay',
  templateUrl: './f-color-picker-overlay.component.html',
  styleUrls: [ './f-color-picker-overlay.component.scss' ],
  standalone: true,
  animations: [ matSelectAnimations.transformPanel ],
  imports: [ CdkConnectedOverlay, CdkOverlayOrigin, FColorPickerComponent, FColorPickerRectComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FColorPickerOverlayComponent extends FOverlayPanelBase implements AfterViewInit {

  @ViewChild(FColorPickerComponent, { static: false })
  protected fPickerComponent!: FColorPickerComponent;

  private get ngControl(): NgControl | AbstractControlDirective {
    return this.inputContainer!._formFieldControl.ngControl!;
  }

  public color: string = '#000000';

  constructor(
    private inputContainer: MatFormField,
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.color = this.ngControl.value;
    this.changeDetectorRef.detectChanges();
  }

  public override getConnectedOverlayOrigin(): ElementRef {
    return this.inputContainer.getConnectedOverlayOrigin()!;
  }

  public override onAttach(): void {
    this.color = this.ngControl.value;
    this.fPickerComponent.color = this.color;

    this.fPickerComponent.setPresets([
      '#FF4B4B', '#FF8282', '#B32323', '#1594EF',
      '#FFC329', '#F75826', '#D5C2C2', '#000000',
      '#A04EE1', '#19CD6C', '#4EA882', '#15B442',
      '#249566', '#15CCC1', '#68D525', '#2A6C29',
      '#00A0A0', '#FFAC4B', '#694DDB', '#2648FE',
      '#F9F9F9', '#735F51', '#786848', '#88776D',
    ]);
  }

  public onColorSelect(color: string): void {
    this.overlay.backdropClick.emit();
  }

  public override onBackdropClick(): void {
    this.setValue(this.fPickerComponent.color);
  }

  public updateValue(color: string): void {
    this.setValue(color);
    this.changeDetectorRef.detectChanges();
  }

  private setValue(color: string): void {
    this.color = color;
    this.ngControl.control!.setValue(this.color);
  }
}
