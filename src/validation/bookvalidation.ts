import Joi from 'joi';

export const bookValidation = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  publishedYear: Joi.number().required(),
});
