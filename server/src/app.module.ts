import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { PublicationsModule } from './publications/publications.module.js';
import { BlogsModule } from './blogs/blogs.module.js';
import { ContentModule } from './content/content.module.js';
import { NewsletterModule } from './newsletter/newsletter.module.js';
import { UploadsModule } from './uploads/uploads.module.js';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(process.cwd(), 'uploads'),
        serveRoot: '/uploads',
      },
      {
        rootPath: join(process.cwd(), 'assets'),
        serveRoot: '/assets',
      },
    ),
    PrismaModule,
    AuthModule,
    UsersModule,
    PublicationsModule,
    BlogsModule,
    ContentModule,
    NewsletterModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
