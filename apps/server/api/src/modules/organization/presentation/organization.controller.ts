import { Elysia } from 'elysia';

import { authGuard } from '$modules/auth';
import { OrganizationHttpModel } from '$modules/organization/presentation/organization.http-model';
import { errorPlugin } from '$shared/http/plugin/error.plugin';
import { ApiResponseBuilder } from '$shared/responses/api-response-builder';

import type { CreateHandler } from '$modules/organization/application/commands/create/create.handler';

interface OrganizationDependencies {
  createHandler: CreateHandler;
}

export function createOrganizationController(deps: OrganizationDependencies) {
  return (
    new Elysia({
      prefix: '/organization',
      detail: {
        tags: ['Organization'],
      },
    })
      .use(errorPlugin)
      .use(authGuard)
      .model(OrganizationHttpModel)
      // POST /organization
      .post(
        '/',
        async ({ body, set }) => {
          await deps.createHandler.execute(body);
          set.status = 201;

          return ApiResponseBuilder.success({
            message: 'Organization create success',
          });
        },
        {
          body: 'create',
          detail: {
            summary: 'Create Organization',
          },
        },
      )
  );
}
