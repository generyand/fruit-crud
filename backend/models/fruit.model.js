import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Fruit = sequelize.define('Fruit', {
  fruit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fruit_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'fruits',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Fruit;