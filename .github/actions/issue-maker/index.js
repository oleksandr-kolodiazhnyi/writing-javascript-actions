const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    try {
        const issueTitle = core.getInput("issue-title");
        const jokeBody = core.getInput("joke");
        const token = core.getInput("repo-token");

        console.log(jokeBody);

        const octokit = new github.getOctokit(token);
        const newIssue  = await octokit.request('POST /repos/{owner}/{repo}/issues', {
            repo: github.context.repo.repo,
            owner: github.context.repo.owner,
            title: issueTitle,
            body: jokeBody
        });
        // const newIssue = await octokit.issues.create({
        //     repo: github.context.repo.repo,
        //     owner: github.context.repo.owner,
        //     title: issueTitle,
        //     body: jokeBody
       // });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();