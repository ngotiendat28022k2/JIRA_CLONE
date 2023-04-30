/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getProject: async (req, res, next) => {
    try {
      const project = await Project.findOne({ _id: req.params.id });
      const issues = await Issue.find({ projectId: req.params.id });
      project.issues = issues;
      res.json(project);
    } catch (error) {
      return res.status(403).json({
        message: "error, read project notfound !",
        error,
      });
    }
  },
  removeProject: async (req, res, next) => {
    try {
      project = await Project.destroyOne({ _id: req.params.id });
      issue = await Issue.destroy({ projectId: req.params.id });

      res.json({ project, issue });
    } catch (error) {
      return res.status(403).json({
        message: "error",
        error,
      });
    }
  },
};
