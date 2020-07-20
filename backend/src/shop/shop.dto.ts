
// DTO stands for Data Transfer Object
// We made these. These are actually essential for API client code generation (the helper methods in frontend/src/api).
// NestJS looks for these inside files ending in .dto.ts, if a Controller uses it as a parameter or return type
export class GetAllShopsDto {
  shops: ShopDto[];
}

export class ShopDto {
  name: string;
  description: string;
  _id: string;
  createdAt: string;
}

export class CreateShopDto {
  name: string;
  description: string;
}
