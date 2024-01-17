const express = require("express")
const PersonalInfoController = require("../controllers/userPersonalInfoController")
const upload = require("../config/multer")

const router = express.Router()

router.get("/:userId",PersonalInfoController.getPersonalInfo)
router.post("/:userId",upload.none(),PersonalInfoController.createPersonalInfo)
router.put("/:userId",upload.none(),PersonalInfoController.updatePersonalInfo)
router.delete("/:userId",PersonalInfoController.deletePersonalInfo)

module.exports = router