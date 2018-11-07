# Contributing

## Issues and Branches

Work is typically limited to the items that are assigned to an individual. Each issues should have
its own independent branch. Please do commit changes to unrelated items to a branch. If an issue
would be easier to finish by refactoring existing code, please do this on an independent branch
prior to starting the issue. This fine grained approach makes it easier for reviewers to merge
progress.

When work is well underway it is typical to be working on 2-3 branches/issues at a time. This allows work
to continue unhindered while waiting for other items to work through the submission and Q/A process.

## Squash/Rebase - Don't merge

This project uses a squash/rebase strategy for managing Git history. As work on an item progresses it is
not uncommon for the master branch to advance forward. This should not be dealt with by merging.
Rather, the feature branch in progress should be rebased onto the latest version of master. This approach
places the responsibility of conflict resolution on the feature implementer rather than the reviewer.

## Review and Submission

The review process on this project involves several steps; code prep, requesting review,
review adjustments, repeat.

### Code prep

#### Branch cleanup

Before requesting a review, the code should be fully prepared for merging into master. This means that the
change should be represented by a single commit that sits on top of the master branch. Unlike most projects
that use a merge strategy for branch management; this project does not wish to track the intermediate progress
of a feature. Instead, a single commit represents the entirety of the change requried to address the issue in
question.

Throughout the history of an item it is likely that multiple branches are created as a side effect of
maintaining the history in this way. Ensure that all old branches are deleted both locally and remotely.

#### CI/CD

Once the branch history has been cleaned up it is time to check that the branch passes CI/CD. To do this
push the branch to a remote branch of the same name, but add "-test" to the end. This will automatically
trigger a remote build. These can be viewed in the pipelines section on Bitbucket. If the build process
fails make adjustments as necessary, cleanup the branch history and try again. Changes will not be fully
reviewed unless there is a passing "-test" branch.

### Code Review

Once the build passes, the author of the change should request a review using the team chat tools. As of
the time of writing this document the only reviewer is Paul Spears, and the team chat tool is Google Chat.
Typically, Bitbucket will be used to provide feedback in the form of comments. Once all of the comments
have been addressed, the author will need to repeat the history/CI/CD process again to request a new
review.

### Merging

Once a branch passes review, the reviewer will add the commit to master and close any related tickets

## Tips and tricks

Push early and often. Reviewers will typcially comment early as work is being done. This often reduces
the number of code reviews that are needed at the end of the process. This is espically true for developers
new to a project that are not yet familiar with a projects quirks or the team leads technical direction.

Don't create more than 3-4 branches. Having more than this open is typically a sign that effort needs to
be redirected towards completing existing work rather than starting more issues.

The top level build.sh script is a very close approximation to what the CI/CD server runs. It is often faster
to get this script to complete successfully before attempting to pass CI/CD.
