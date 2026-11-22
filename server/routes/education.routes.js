
import express from "express";
import educationCtrl from "../controllers/education.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/educations")
  .get(educationCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.removeAll);

router.route("/api/educations/:id")
  .get(educationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, educationCtrl.remove);

export default router;
