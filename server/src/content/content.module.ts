import { Module } from '@nestjs/common';
import { ResearchAreasController } from './research-areas.controller.js';
import { PeopleController } from './people.controller.js';

@Module({
  controllers: [ResearchAreasController, PeopleController],
})
export class ContentModule {}
