class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.filterCriteria = {};
    this.page = 1;
    this.limit = 12;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'featured'];
    excludedFields.forEach((key) => delete queryObj[key]);

    if (this.queryString.featured !== undefined) {
      queryObj.featured = this.queryString.featured === 'true';
    }

    if (this.queryString.search) {
      queryObj.$or = [
        { name: { $regex: this.queryString.search, $options: 'i' } },
        { description: { $regex: this.queryString.search, $options: 'i' } },
        { category: { $regex: this.queryString.search, $options: 'i' } },
      ];
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.filterCriteria = JSON.parse(queryStr);
    this.query = this.query.find(this.filterCriteria);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    this.page = Math.max(1, parseInt(this.queryString.page, 10) || 1);
    this.limit = Math.min(100, Math.max(1, parseInt(this.queryString.limit, 10) || 12));
    const skip = (this.page - 1) * this.limit;

    this.query = this.query.skip(skip).limit(this.limit);
    return this;
  }
}

module.exports = APIFeatures;
