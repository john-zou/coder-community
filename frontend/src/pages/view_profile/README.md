# Route: user/:username

###`ViewProfile` is the root
- `state.user` is used to determine what to render (not `state.isLoggedIn`)
- If user is logged in and this username is the user's, it renders `OwnProfile`
- If user is not logged in, or this username is not the user's, it renders `OtherProfile`
