const Menu = require("../model/menu");

async function createMenu(req, res) {
  const menu = new Menu(req.body);

  try {
    const result = await menu.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ msg: "Error while creting menu" });
  }
}

async function getMenus(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.find({ active }).sort({ order: "asc" });
  }

  if (!response) {
    res.status(400).send({ msg: "There is no menu to be found!" });
  } else {
    res.status(200).send(response);
  }
}

async function updateMenu(req, res) {
  const { id } = req.params;
  const menuData = req.body;

  const response = await Menu.findByIdAndUpdate({ _id: id }, menuData);
  if (!response) {
    res.status(400).send({ msg: "Couldn't Update Menu" });
  } else {
    res.status(200).send({ msg: "Menu updated" });
  }
}

async function deleteMenu(req, res) {
  const { id } = req.params;

  const response = await Menu.findByIdAndDelete({ _id: id });

  if (!response) {
    res.status(400).send({ msg: "Couldn't find the menu id" });
  } else {
    res.status(200).send({ msg: "The menu has been deleted" });
  }
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};
