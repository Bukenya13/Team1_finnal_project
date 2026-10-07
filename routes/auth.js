const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { requireAuth } = require("../middleware/auth");

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
// user's GitHub profile and respond with a JWT for the protected endpoints
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

    if (!process.env.JWT_SECRET) {
      throw createError(500, "JWT_SECRET is not configured.");
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
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message:
        "GitHub OAuth login successful. Use this token on protected endpoints as 'Authorization: Bearer <token>'.",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
});

// who am I? (requires a valid token)
router.get("/user", requireAuth, (req, res) => {
  //#swagger.tags=["Auth"]
  res.status(200).json({ user: req.user });
});

// stateless JWT: the client just discards its token
router.get("/logout", (req, res) => {
  //#swagger.tags=["Auth"]
  res.status(200).json({
    message: "Logged out. Discard the token stored on the client.",
  });
});

module.exports = router;
