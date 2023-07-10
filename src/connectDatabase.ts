import {DataSourceOptions, DataSource } from 'typeorm';
import ormconfig = require("../src/config/ormconfig");

export const connectDatabase = async () => {
    try {
      const connectionOptions: DataSourceOptions = {
        ...ormconfig,
        name: 'default',
      };
     const dataSource = new DataSource(connectionOptions);
     return dataSource;
    }
      catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};
