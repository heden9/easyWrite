import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/app';
import Home from './routes/Home2';
import Person from './routes/Person';
import File from './routes/File';
import NotFound from './routes/NotFound';
import WritePage from './routes/WritePage';
import InfoPage from './routes/InfoPage';
import BasicInfo from './routes/BasicInfo';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="person" components={Person} />
        <Route path="file" components={File} />
        <Route path="write/:id" components={WritePage} />
        <Route path="info/:id" components={InfoPage} />
        <Route path="basic" components={BasicInfo} />
        <Route path="*" components={NotFound} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
