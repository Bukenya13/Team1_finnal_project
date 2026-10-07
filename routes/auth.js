const router = require("express").Router();

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";

const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const getCallbackUrl = (req) =>
  process.env.CALLBACK_URL ||
  `${req.protocol}://${req.get("host")}/auth/github/callback`;

// STEP 1: send the browser to GitHub's consent screen
router.get("/github", (req, res, next) => {
  try {
    //#swagger.tags=["Auth"]
    if (!process.env.GITHUB_CLIENT_ID) {
      throw createError(500, "GITHUB_CLIENT_ID is not configured.");
    }

    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: getCallbackUrl(req),
      scope: "read:user",
    });

    res.redirect(`${GITHUB_AUTHORIZE_URL}?${params.toString()}`);
  } catch (err) {
    next(err);
  }
});

// STEP 2: GitHub redirects back here with a code, we exchange it for the
// user's GitHub profile and store user in session
router.get("/github/callback", async (req, res, next) => {
  try {
    //#swagger.tags=["Auth"]
    const { code } = req.query;

    if (!code) {
      throw createError(400, "Missing OAuth code parameter.");
    }

    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      throw createError(500, "GitHub OAuth is not configured.");
    }

    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw createError(
        401,
        `GitHub OAuth failed: ${tokenData.error_description || tokenData.error}`,
      );
    }

    const userResponse = await fetch(GITHUB_USER_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Team1-Library-API",
      },
    });

    if (!userResponse.ok) {
      throw createError(
        401,
        "GitHub OAuth failed: unable to fetch the GitHub user.",
      );
    }

    const githubUser = await userResponse.json();

    const user = {
      githubId: githubUser.id,
      login: githubUser.login,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
    };

    // Store user in session
    req.session.user = user;

    res.status(200).json({
      message: "GitHub OAuth login successful",
      user,
    });
  } catch (err) {
    next(err);
  }
});

// Get current user from session
router.get("/user", (req, res) => {
  //#swagger.tags=["Auth"]
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).json({ user: req.session.user });
});

// Logout - destroy session
router.get("/logout", (req, res) => {
  //#swagger.tags=["Auth"]
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;