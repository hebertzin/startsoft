import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Order } from 'src/orders/domain/Order';

@Injectable()
export class OrderSearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async index(order: Order) {
    await this.elasticsearchService.index({
      index: 'orders',
      document: {
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items,
      },
    });
  }

  async filterOrders(params: {
    id?: string;
    status?: string;
    start?: string;
    end?: string;
    item?: string;
  }) {
    const must: any[] = [];
    const filter: any[] = [];

    if (params.id) {
      must.push({ term: { id: params.id } });
    }

    if (params.status) {
      must.push({ match: { status: params.status } });
    }

    if (params.start || params.end) {
      filter.push({
        range: {
          createdAt: {
            ...(params.start ? { gte: params.start } : {}),
            ...(params.end ? { lte: params.end } : {}),
          },
        },
      });
    }

    if (params.item) {
      must.push({
        nested: {
          path: 'items',
          query: {
            bool: {
              should: [
                { match: { 'items.name': params.item } },
                { term: { 'items.productId': params.item } },
              ],
            },
          },
        },
      });
    }

    const { hits } = await this.elasticsearchService.search({
      index: 'orders',
      query: {
        bool: {
          must,
          filter,
        },
      },
    });

    return hits.hits.map((hit) => hit._source);
  }

  async searchByStatus(status: string) {
    return this.filterOrders({ status });
  }

  async searchByItemName(itemName: string) {
    return this.filterOrders({ item: itemName });
  }
}
