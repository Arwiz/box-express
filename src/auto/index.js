import autoRouter from '.auto-router';
import metaModuleRouter from './meta-module-router';

export default (app)=> {
    app.use('/api/v1/metamodules', metaModuleRouter);
    app.use('/api/v1/auto', autoRouter);
};