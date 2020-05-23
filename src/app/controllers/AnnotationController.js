import Annotation from '../models/Annotation';
import * as Yup from 'yup';
import User from '../models/User';


class AnnotationController {

    async index(req, res) {

        const annotation = await Annotation.findAll({
            where: {
                user_id: req.userId
            },
            order: ['created_at'],
            attributes: ['title', 'text', 'createdAt', 'updatedAt'],
        });



        return res.json(annotation)

        
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            title: Yup.string(),
            text: Yup.string()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails'
            })
        }

        const {
            title,
            text
        } = req.body

        if (!text) {
            return res.status(401).json({
                error: "You can't create an empty annotation"
            })
        }

        const annotation = await Annotation.create({
            user_id: req.userId,
            title,
            text
        })

        return res.json(annotation);
    }


    async show(req, res) {
        const annotation = await Annotation.findOne({
            where: {
                id: req.params.id
            }
        })


       return res.json(annotation);
        

    }



    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            text: Yup.string().required()
        });

        const annotation = Annotation.findByPk(req.params.id);

        if (!(await schema.isValid)) {
            return res.status(400).json({
                error: "Validation Fails"
            })
        }

        const {
            title,
            text
        } = (await annotation).update(req.body);

        return res.json({
            message: "Annotation updated"
        });
    }

    async delete(req, res) {
        const annotation = await Annotation.destroy({
            where: {
                user_id: req.userId,
                id: req.params.id
            }
        });


        return res.json(annotation);
    }

}

export default new AnnotationController();