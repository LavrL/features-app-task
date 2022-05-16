import { Component } from "@angular/core";
import { FeatureService } from "src/app/services/feature-list.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './feature-add.component.html',
  styleUrls: ['./feature-add.component.scss']
})
export class FeatureAddComponent {
  displayName: string;
  technicalName: string;
  effectiveDate: any;
  description: string;

  constructor(public featureService: FeatureService) { }

  onSubmit(): void {
    this.featureService.addFeature(this.displayName,
      this.technicalName,
      this.effectiveDate,
      this.description,
      false);

    this.displayName = '';
    this.technicalName = '';
    this.effectiveDate = '';
    this.description = '';
  }

}
