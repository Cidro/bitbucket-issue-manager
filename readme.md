## Installation
```
npm install
cp .env.example .env
```

Update `.env` file with right Bitbucket credentials

## Run

### Close all issues of a user on a repository from a workspace
```
node index.js --workspace {workspaceName} --repository {repositoryAlias} --kind {issueKind} --assignee {userName} --action close
```
