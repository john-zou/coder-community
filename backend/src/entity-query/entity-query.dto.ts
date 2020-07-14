

export class EntityQuery {
  collection: string;
  query?: any;
  projection?: any;
  estimatedDocumentCount?: boolean;
  countDocuments?: boolean;
  limit?: number;
  skip?: number;
  sort?: any;
}