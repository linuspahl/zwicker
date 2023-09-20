import controller from "../../controllers/match";

const create =  async ({ userId, body: { title, password } }, res, next) => {
  const match = await controller.create({ hostUserId: userId, title, password, userId })

  res.locals.match = match

  next()
};

export default { create }