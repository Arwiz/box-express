import organizationRouter from './admin-router';
import permissionRouter from './permission-router';
import projectRouter from './project-router';
import teamRouter from './team-router';
import autoRouter from './auto-router';
import metaModuleRouter from './meta-module-router';

export default (app)=> {
    app.use('/api/v1/projects', projectRouter);
    app.use('/api/v1/orgs', organizationRouter);
    app.use('/api/v1/teams', teamRouter);
    app.use('/api/v1/permissions', permissionRouter);
    app.use('/api/v1/metamodules', metaModuleRouter);
    app.use('/api/v1/auto', autoRouter);
};