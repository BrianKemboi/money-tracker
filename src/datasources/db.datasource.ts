import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'mongodb',
  url:
    'mongodb+srv://touchinspiration:touch12345@gettingstartedcluster.yhs6c.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  host: 'gettingstartedcluster.yhs6c.gcp.mongodb.net',
  port: 27017,
  user: 'touchinspiration',
  password: 'touch12345',
  database: 'myFirstDatabase',
  useNewUrlParser: true,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
