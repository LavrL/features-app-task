import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationFeature } from 'src/app/models/feature';
import { FeatureService } from 'src/app/services/feature-list.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  allFeatures: ApplicationFeature[] = [];

  applicationFeature: ApplicationFeature;
  feature: ApplicationFeature;
  editing = false;

  displayName: string;
  technicalName: string;
  effectiveDate: Date;
  description: string;

  constructor(private activateRoute: ActivatedRoute, public featureService: FeatureService, public router: Router) { }

  ngOnInit(): void {
    this.getAllFeatures();
    this.activateRoute.params.subscribe(p => {
      if (typeof this.allFeatures !== 'undefined') {
        if (p.param === 'archived') {
          this.featureService.allCurrentFeatures = this.allFeatures.filter(feature => feature.archived == true);
        } else {
          this.featureService.allCurrentFeatures = this.allFeatures.filter(feature => feature.archived == false);
        }
      }
    });
  }

  editFeature(feature: ApplicationFeature):void {
    this.editing = !this.editing;
    feature.editable = !feature.editable;
    this.featureService.updateFeature(feature);
  }

  getAllFeatures(): void {
    this.allFeatures = this.featureService.getFeatures();
  }

  onSubmit(): void {
    this.featureService.addFeature(this.displayName, this.technicalName, this.effectiveDate, this.description);
    this.getAllFeatures();
  }

  archiveFeature(featureToArchive: ApplicationFeature): void {
    this.getAllFeatures();
    const archElement: ApplicationFeature | undefined = this.allFeatures.find(el => el.id == featureToArchive.id);
    if (archElement) {
      archElement.archived = true;
    }

    this.featureService.setFeatures(this.allFeatures);

    this.getAllFeatures();
    this.featureService.allCurrentFeatures = this.allFeatures.filter(feature => feature.archived == false);
  }

  deleteFeature(feature: ApplicationFeature): void {
    const featureToDelete: number = this.allFeatures.indexOf(feature);
    this.allFeatures.splice(featureToDelete, 1);

    this.featureService.setFeatures(this.allFeatures);

    this.getAllFeatures();
    this.featureService.allCurrentFeatures = this.allFeatures.filter(feature => feature.archived == true);
  }

}
