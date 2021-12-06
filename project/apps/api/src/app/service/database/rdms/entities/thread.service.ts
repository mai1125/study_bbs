import { Injectable } from '@nestjs/common';
import { AbstractRDBMSService } from '../abstract.service';
import { ThreadEntity } from '../../../../typeorm/entities';
@Injectable()
export class ThreadEntityService extends AbstractRDBMSService<ThreadEntity> {
  constructor() {
    super(ThreadEntity.name);
  }
}
