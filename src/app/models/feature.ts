export class ApplicationFeature {
  id: number;
  displayName?: string;
  technicalName: string;
  effectiveDate?: Date;
  description?: string;
  completed: boolean;
  editable: boolean;
  archived: boolean;

  constructor(id: number,
              displayName: string,
              technicalName: string,
              effectiveDate: Date,
              description: string,
              completed: boolean,
              editable: boolean,
              archived: boolean){
    this.id = id;
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.effectiveDate = effectiveDate;
    this.description = description;
    this.completed = completed;
    this.editable = editable;
    this.archived = archived;
  }
}
