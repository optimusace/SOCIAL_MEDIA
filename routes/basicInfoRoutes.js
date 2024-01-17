const express = require("express")
const BasicInfoController = require("../controllers/userBasicInfoController")
const upload = require("../config/multer")

const router = express.Router()

router.get("/",BasicInfoController.getUsers)
router.get("/:id",BasicInfoController.getSpecificUser)
router.post("/",upload.single("photo"),BasicInfoController.addUser)
router.put("/:id",upload.single("photo"),BasicInfoController.updateUser)
router.delete("/:id",BasicInfoController.deleteUser)

module.exports = router