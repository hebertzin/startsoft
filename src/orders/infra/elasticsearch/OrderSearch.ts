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

  async searchByStatus(status: string) {
    const { hits } = await this.elasticsearchService.search({
      index: 'orders',
      query: {
        match: { status },
      },
    });

    return hits.hits.map(hit => hit._source);
  }
}
