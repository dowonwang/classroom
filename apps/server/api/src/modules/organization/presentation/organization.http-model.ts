import { z } from 'zod';

export const OrganizationHttpModel = {
  create: z.object({
    userId: z.uuidv7(),
    title: z.string(),
  }),
};

export type OrganizationHttpModel = {
  [K in keyof typeof OrganizationHttpModel]: z.infer<
    (typeof OrganizationHttpModel)[K]
  >;
};
