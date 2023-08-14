const TodosModel = require("../models/TodosModel")

class TodosController {

    async getTodos (req, res) {
        try {
            const todos = await TodosModel.find({}, "title")
            res.status(200).json({todos})
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при получении"})
        }
    }

    async addTodo (req, res) {
        try {
            if (!req.body.title) {
                res.status(400).json({message: "Пожалуйста, добавьте заголовок"})
            }

            const todoModel = new TodosModel({title: req.body.title})

            await todoModel.save()

            res.status(200).json({message: "Элемент успешно добавлен"})
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при добавлении"})
        }

    }

    async deleteTodo (req, res) {
        try {
            if (!req.body.title) {
                res.status(400).json({message: "Пожалуйста, укажите заголовок"})
            }

            const { deletedCount } = await TodosModel.deleteOne({title: req.body.title })

            if (deletedCount === 0) {
                res.status(400).json({message: "Удаление не произошло, пожалуйста проверьте заголовок"})
            }

            res.status(200).json({message: "Элемент был успешно удален"})
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при удалении"})
        }

    }

    async editTodo (req, res) {
        try {
            if (!req.body.id) {
                res.status(400).json({message: "Пожалуйста, проверьте id"})
            }

            await TodosModel.findByIdAndUpdate(req.body.id, { title: req.body.newTitle }, { new: true })

            res.status(200).json({message: "Элемент был успешно отредактирован"})

        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при редактировании"})
        }
    }

}

module.exports = new TodosController()