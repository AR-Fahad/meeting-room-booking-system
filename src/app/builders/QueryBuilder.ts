import { FilterQuery, Query } from 'mongoose';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // for filtering
  filter() {
    const queryObj = { ...this.query };
    const excludes = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'max',
      'min',
      'maxCap',
      'minCap',
    ];
    excludes.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // for searching
  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => {
          return {
            [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
          } as FilterQuery<T>;
        }),
      });
    }
    return this;
  }

  // for minimum & maximum price
  priceRange() {
    if (this?.query?.min) {
      this.modelQuery = this.modelQuery.find({
        pricePerSlot: { $gte: Number(this?.query?.min) },
      });
    }
    if (this?.query?.max) {
      this.modelQuery = this.modelQuery.find({
        pricePerSlot: { $lte: Number(this?.query?.max) },
      });
    }
    return this;
  }

  // capacity
  capacityRange() {
    if (this?.query?.minCap) {
      this.modelQuery = this.modelQuery.find({
        capacity: { $gte: Number(this?.query?.minCap) },
      });
    }
    if (this?.query?.maxCap) {
      this.modelQuery = this.modelQuery.find({
        capacity: { $lte: Number(this?.query?.maxCap) },
      });
    }
    return this;
  }

  // for sorting
  sort() {
    const sort = this?.query?.sort
      ? (this.query.sort as string).split(',').join(' ')
      : '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // for paginate
  paginate() {
    const limit = this?.query?.limit ? Number(this.query.limit) : 0; // 0 means get all docs
    const skip = this?.query?.page ? (Number(this.query.page) - 1) * limit : 0;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // for fields projection
  fields() {
    const fields = this?.query?.fields
      ? (this.query.fields as string).split(',').join(' ')
      : '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
