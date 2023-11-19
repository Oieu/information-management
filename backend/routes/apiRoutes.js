import express from "express";
import login from "./auth/login/login.js";
import members from "./members/members.js";
import logout from "./auth/logout/logout.js";
import users from "./admin/users/users.js";
import services from "./admin/services/services.js";
import materials from "./admin/materials/materials.js";
import signup from "./auth/signup/signup.js";
import reset from "./auth/reset/reset.js";
import getServices from "./members/getServices.js";
import profile from './members/profile.js';
import test from './test.js';
import update from './auth/reset/update.js';
import analytics from './admin/analytics/analytics.js';

const router = express.Router();

router.use(login);
router.use(signup);
router.use(members);
router.use(logout);
router.use(users);
router.use(services);
router.use(materials);
router.use(reset);
router.use(getServices);
router.use(profile);
router.use(test);
router.use(update);
router.use(analytics);

export default router;
