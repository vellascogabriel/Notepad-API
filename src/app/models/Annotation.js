import Sequelize, {
    Model
} from 'sequelize';

class Annotation extends Model {
    static init(sequelize) {
        super.init({
            user_id: Sequelize.INTEGER,
            title: Sequelize.STRING,
            text: Sequelize.TEXT,
        }, {
            sequelize,
        });


        return this;
    };

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: "annotation"
        });
    }

}


export default Annotation;