/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createIssue: async (req, res) => {
    try {
      const exitIssue = await Issue.findOne({ title: req.body.title });
      if (exitIssue) {
        return res.status(400).json({
          message: "error,issue exit!",
          error,
        });
      }

      const issue = await Issue.create(req.body).fetch();
      console.log("issue", issue);
      if (issue) {
        res.status(200).json({
          message: "Create Issue SuccessFully !",
          issue,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "error, create issue false!",
        error,
      });
    }
  },
  searchIssues: async (req, res) => {
    try {
      const searchValue = req.query.search;

      const data = await Issue.find().where({
        or: [
          { title: { contains: searchValue } },
          { description: { contains: searchValue } },
        ],
      });

      res.json(data);
    } catch (error) {
      return res.status(400).json({
        message: "error,search issue error !",
        error,
      });
    }
  },
};
