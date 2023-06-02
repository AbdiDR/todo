const { Todos, Users } = require("../database/models");

// const bcrypt = require("bcrypt");
// const jwtHelper = require("../helper/jwtHelper");
console.log(Todos);
const addTodo = async (req, res) => {
  try {
    const user = req.user;
    const { title, status } = req.body;
    console.log({
      user,
      title,
      status,
    });

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todos.create({
      title,
      status,
      user_id: user.id,
    });

    return res.status(200).json({
      message: "Berhasil menambahkan todo!",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};


const getByuid = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todos.findAll({
        where: {
            user_id: id
        }
    });

    console.log(todo);

    if (!todo) {
      return res.status(404).json({
        message: "Todo masih kosong!",
      });
    }

    return res.status(200).json({
      message: "Berhasil mendapatkan todo dengan user_id",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

const putByid = async (req, res) => {
  try {
    const user = req.user;
    const {status} = req.body;
    const id = req.params.id;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    //   const todo = await getByid(req);
    const todo = await Todos.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
      });
    }
    await Todos.update(
      {
        title: todo.title,
        status: status,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({
      message: "Berhasil update",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteByid = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todos.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
      });
    }
    await Todos.destroy({
      where: { id },
    });

    return res.status(200).json({
      message: "Berhasil menghapus todo",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAll = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todos.findAll({
        where: {
            user_id: id
        }
    });
    console.log(todo)

    if (todo.length < 1) {
      return res.status(404).json({
        message: "Todo masih kosong!",
      });
    }
    await Todos.destroy({
      //   where: { id },
      where: {
        user_id: id
      },
      truncate: true,
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus semua todo",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTodo,
  getByuid,
  putByid,
  deleteByid,
  deleteAll,
};
