import { HttpException, HttpStatus } from '@nestjs/common';

import { PaginationResponse } from './interfaces/pagination-response.type';
import { PAGINATION_MAX_SIZE } from './constants/common';

type PaginationType = {
  skip: number;
  take: number;
};

export class Pagination {
  private MAX_SIZE = PAGINATION_MAX_SIZE;
  private page: number;
  private size: number;

  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;

    if (this.size > this.MAX_SIZE) {
      throw new HttpException(
        `Max size is ${this.MAX_SIZE}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getPagination(): PaginationType {
    return { skip: (this.page - 1) * this.size, take: this.size + 1 };
  }

  public getResponse<T>(data: T[], count: number): PaginationResponse<T> {
    const isLast = data.length <= this.size;

    if (!isLast) {
      data.pop();
    }

    return {
      data,
      isLast,
      page: this.page,
      size: this.size,
      totalCount: count,
    };
  }
}
