require("dotenv").config();
const { argv } = require("yargs");
const bitbucket = require("./bitbucket");

async function initialize (workspace, repository, action, filters) {
  const bitbucketService = bitbucket({
    username: process.env.BB_USERNAME,
    password: process.env.BB_PASSWORD
  }, workspace, repository);

  const allIssues = await bitbucketService.issues.fetch(filters);

  for (const issue of allIssues) {
    if (action === "close") { await bitbucketService.issues.close(issue); }
  }
  return Promise.resolve(`${allIssues.length} issues have been updated to "${action}"`);
};

const workspace = argv.workspace;
const repository = argv.repository;
const action = argv.action ? argv.action : "close";
const assignee = argv.assignee ? argv.assignee : null;
const filters = {
  kind: argv.kind,
  assignee: assignee
};

if (!workspace || !repository) { throw new Error("Workspace and repository are required."); }

initialize(workspace, repository, action, filters)
  .then(result => {
    console.log("result:", result);
  })
  .catch(err => {
    console.log("err:", err);
  });
