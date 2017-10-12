# Early Modeling Notes

> app store approval hub thing

## Worflow

I probably missed a step since i was dum and didn't snap a pic of the
whiteboard.

* Submit app bundle
* Resign
* Manually test if installable
  * Send back to submitter for revision
  * jump to Submit app bundle
* Publish to hca app store

## Draft: Data Model

Using this to feel out a simple model, not to be considered definitive or
final. Will likely start with something even simpler.

    User
        role: <string>  # reviewer | submitter
        hcaid: <string> # 3-4
        first: <string>
        last: <string>
        email: <string>
        altEmail: <string> # need stuff like this?

    AppBundle
        name: <string>
        version: <string>
        path: <string>          # path on disk to binary
        submitter: <User>

    Submission
        appBundle: <AppBundle>
        timestamp: <int>
        history: [ProcessStage] # ordered by timestamp

    ProcessStage
        name: <string> # new, in-review, has-issue:issue, has-issue:issue-2, approved, published
        appBundle: <AppBundle> # for querying, show me all apps in state X
        timestamp: <int>
        signatory: <User> # who moved it to this state

    SigningProfile
        # we need some serializable concept of a signing capability?

    # dunno if we need these yet, not sure where convo will happen mostly (likely
    # email to begin with?)
    Converstaion
        comments: [Comment]

    Comment
        author: <User>
        body: <string>
        timestamp: <int>
