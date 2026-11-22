import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public signup
router.route("/api/users")
  .post(userCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.list);

// Individual user
router.route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;