/**
 * Tasks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    type: { type: "string", defaultsTo: "task" },
    title: { type: "string", required: true, unique: true },
    description: { type: "string" },
    status: {
      type: "string",
      isIn: ["backlog", "selected", "inprogress", "done"],
      defaultsTo: "backlog",
    },
    priority: {
      type: "string",
      defaultsTo: "medium",
    },
    index: {
      type: "string",
      defaultsTo: "0",
    },
    timeSpent: {
      type: "number",
    },
    timeRemaining: {
      type: "number",
    },
    estimate: {
      type: "number",
    },
    // commentId: {
    //   type: "json",
    //   columnType: "array",
    // },
    startDate: {
      type: "string",
    },
    dueDate: {
      type: "string",
    },

    projectId: {
      type: "string",
    },
    assignees: { type: "json", columnType: "Array" },
    userId: { type: "string" },
    age: { type: "string" },
  },
};
