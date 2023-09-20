const create = (req, res, next) => res.send({
  message: "Match was created successfully!",
  match: formatMatch(match)
});

export default {
  create
}