import { Injectable } from "@angular/core";
import { ApplicationFeature } from "../models/feature";

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  allFeatures: ApplicationFeature[] = [];
  allCurrentFeatures: ApplicationFeature[] = [];
  nextId = 0;

  constructor() {
    this.loadFeatureList();
  }

  public addFeature(displayName: string, technicalName: string, effectiveDate: Date, description: string, editable = false): void {
    let featureList = this.getFeatures();
    if (typeof featureList === 'undefined') {
      this.allFeatures = [];
      featureList = this.allFeatures;
    }
    if (featureList.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = featureList[featureList.length - 1].id;
      this.nextId = maxId + 1;
    }
    let feature = new ApplicationFeature(this.nextId, displayName, technicalName,
      effectiveDate, description, false, editable, false);

    featureList = [...featureList, feature];
    this.setFeatures(featureList);
    this.nextId = this.nextId + 1;
    this.allCurrentFeatures = this.getFeatures().filter(feature => feature.archived == false);
  }

  loadFeatureList(): void {
    this.allCurrentFeatures = this.getFeatures();
  }

  public setFeatures(features: ApplicationFeature[]): void {
    localStorage.setItem('features', JSON.stringify({ features: features }))
  }

  public getFeatures(): ApplicationFeature[] {
    let localStorageItem = JSON.parse(localStorage.getItem('features') || '{}');
    if (localStorageItem == null) {
      return [];
    } else {
      return localStorageItem.features;
    }
  }

  updateFeature(featureToUpdate: ApplicationFeature) {
    let features = this.getFeatures();
    let featureToUpdateIndx = features.findIndex((feature) => feature.id == featureToUpdate.id);
    if (featureToUpdateIndx !== -1) {
      features[featureToUpdateIndx].technicalName = featureToUpdate.technicalName;
      features[featureToUpdateIndx].displayName = featureToUpdate.displayName;
      features[featureToUpdateIndx].description = featureToUpdate.description;
    }
    this.setFeatures(features);
  }

}
