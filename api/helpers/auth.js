"use strict";

const jwt = require("jsonwebtoken");
const {
  secret,
  issuer
} = require('../../config/config').auth;

function sendError(req) {
  return req.res.status(403).json({
    message: "Error: Access Denied"
  });
}

// Setup the security checks for the endpoints that need it.
// This function will be called every time a request to a protected endpoint is received.
exports.verifyToken = function (req, authOrSecDef, token, callback) {
  // These are the scopes/roles defined for the current endpoint
  const currentScopes = req.swagger.operation["x-security-scopes"];

  // Validate the 'Authorization' header. it should have the following format:
  // 'Bearer tokenString'
  if (token && token.indexOf("Bearer ") === 0) {
    const tokenString = token.split(" ")[1];

    jwt.verify(tokenString, secret, function (
      verificationError,
      decodedToken
    ) {
      // Check if the JWT was verified correctly
      if (
        verificationError === null &&
        Array.isArray(currentScopes) &&
        decodedToken &&
        decodedToken.role
      ) {
        // Check if the role is valid for this endpoint
        const roleMatch = currentScopes.indexOf(decodedToken.role) !== -1;

        // Check if the issuer matches
        const issuerMatch = decodedToken.iss === issuer;

        if (roleMatch && issuerMatch) {
          // Add the token to the request so that we can access it in the endpoint code if necessary
          req.auth = decodedToken;

          // If there is no error, just return null in the callback
          return callback(null);
        } else {
          // Return the error in the callback if there is one
          sendError(req);
        }
      } else {
        // Return the error in the callback if the JWT was not verified
        sendError(req);
      }
    });
  } else {
    // Return the error in the callback if the Authorization header doesn't have the correct format
    sendError(req);
  }
};

exports.issueToken = function (sub, role) {
  return jwt.sign({
      sub,
      iss: issuer,
      role
    },
    secret, {
      expiresIn: '3h'
    }
  );
};