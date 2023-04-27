import { Router } from "express";
import * as userGamesCtrl from "../controllers/usergames.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.get("/", isLoggedIn, userGamesCtrl.index);

// localhost3000/usergames/new
router.get("/new", isLoggedIn, userGamesCtrl.new);

router.get("/sort/:sorttype", isLoggedIn, userGamesCtrl.sort);

router.get("/:usergameId", isLoggedIn, userGamesCtrl.show);

router.post("/addGameToList/", isLoggedIn, userGamesCtrl.addGameToList);

// localhost:3000/games/:gameId
router.delete("/:usergameId", isLoggedIn, userGamesCtrl.delete);

router.get("/:usergameId/edit", isLoggedIn, userGamesCtrl.edit);

// localhost:3000/usergames/:usergameId
router.put("/:usergameId", userGamesCtrl.update);

router.post("/:usergameId/comments", isLoggedIn, userGamesCtrl.addComment);

router.get("/:usergameId", isLoggedIn, userGamesCtrl.show);

router.get(
  "/:usergameId/comments/:commentId/edit",
  isLoggedIn,
  userGamesCtrl.editComment
);

router.put(
  "/:usergameId/comments/:commentId",
  isLoggedIn,
  userGamesCtrl.updateComment
);

router.delete(
  "/:usergameId/comments/:commentId",
  isLoggedIn,
  userGamesCtrl.deleteComment
);

export { router };
